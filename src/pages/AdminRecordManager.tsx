import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { ServiceRecord } from '../lib/supabase'
import { Search, Edit2, Trash2, Calendar, AlertCircle, CheckCircle, Gauge } from 'lucide-react'

const AdminRecordManager: React.FC = () => {
  const [registration, setRegistration] = useState('')
  const [records, setRecords] = useState<ServiceRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')
  const [editingRecord, setEditingRecord] = useState<ServiceRecord | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registration.trim()) return

    setLoading(true)
    setError('')
    setSearched(false)

    try {
      const { data, error } = await supabase
        .from('service_records')
        .select(`
          *,
          garages (
            name,
            email
          )
        `)
        .eq('vehicle_registration', registration.toUpperCase())
        .order('service_date', { ascending: false })

      if (error) throw error

      setRecords(data || [])
      setSearched(true)
    } catch (error) {
      console.error('Search error:', error)
      setError('Failed to search records. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service record? This action cannot be undone.')) return

    try {
      const { error } = await supabase
        .from('service_records')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setRecords(records.filter(record => record.id !== id))
    } catch (error) {
      console.error('Error deleting record:', error)
      setError('Failed to delete service record')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-UK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getServiceIcon = (serviceType: string) => {
    if (serviceType.toLowerCase().includes('oil')) {
      return (
        <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
          <circle cx="12" cy="9" r="2"/>
        </svg>
      )
    }
    if (serviceType.toLowerCase().includes('brake')) {
      return (
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L8 6v6c0 5.55 3.84 9.74 9 9.95 5.16-.21 9-4.4 9-9.95V6l-4-4-5 2.5L12 2z"/>
          <rect x="9" y="8" width="6" height="8" rx="1" fill="white"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        </svg>
      )
    }
    return <CheckCircle className="w-5 h-5 text-slate-600" />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
            Service Record Manager
          </h1>
          <p className="text-slate-600">
            Search and manage service records by vehicle registration
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="registration" className="block text-sm font-medium text-slate-700 mb-2">
                Vehicle Registration
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="registration"
                  type="text"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                  placeholder="e.g. AB12CDE"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
                  required
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-2 mb-6">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {searched && (
          <div className="border-t border-slate-200 pt-8">
            {records.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No Records Found
                </h3>
                <p className="text-slate-600">
                  No service records found for vehicle registration <strong>{registration}</strong>
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Service History for {registration}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {records.length} {records.length === 1 ? 'Record' : 'Records'} Found
                  </span>
                </div>

                <div className="space-y-4">
                  {records.map((record) => (
                    <div key={record.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {getServiceIcon(record.service_type)}
                          <div>
                            <h4 className="font-semibold text-slate-900">{record.service_type}</h4>
                            <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(record.service_date)}
                              </span>
                              {record.garages && (
                                <span>
                                  by {record.garages.name}
                                </span>
                              )}
                              {record.mileage && (
                                <span className="flex items-center">
                                  <Gauge className="w-4 h-4 mr-1" />
                                  {record.mileage.toLocaleString()} miles
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingRecord(record)}
                            className="text-slate-400 hover:text-blue-600 transition-colors"
                            title="Edit record"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      {record.notes && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                          <p className="text-slate-700">{record.notes}</p>
                        </div>
                      )}

                      {record.technician_name && (
                        <div className="mt-3 text-sm text-slate-500">
                          Technician: {record.technician_name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal would go here - simplified for now */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Edit Service Record
            </h2>
            <p className="text-slate-600 mb-6">
              Edit functionality would be implemented here with a full form.
            </p>
            <button
              onClick={() => setEditingRecord(null)}
              className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminRecordManager