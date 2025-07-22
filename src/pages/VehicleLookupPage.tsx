import React, { useState } from 'react'
import { Search, FileText, Calendar, Wrench, AlertCircle, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { ServiceRecord } from '../lib/supabase'

const VehicleLookupPage: React.FC = () => {
  const { user, userType } = useAuth()
  const [registration, setRegistration] = useState('')
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState<ServiceRecord[]>([])
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registration.trim()) return

    setLoading(true)
    setError('')
    setSearched(false)

    try {
      console.log('Searching as user:', user?.email, 'userType:', userType)
      
      const query = supabase
        .from('service_records')
        .select(`
          *,
          garages (
            name,
            address
          )
        `)
        .eq('vehicle_registration', registration.toUpperCase())
        .order('service_date', { ascending: false })

      const { data, error } = await query
      
      console.log('Query result:', { data, error, count: data?.length })
      
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-UK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'Full Service':
        return <Wrench className="w-5 h-5 text-blue-600" />
      case 'Oil Change':
        return <FileText className="w-5 h-5 text-green-600" />
      case 'Brake Replacement':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <CheckCircle className="w-5 h-5 text-slate-600" />
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Vehicle Service History Lookup
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Enter a UK vehicle registration number to check its service history
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-8">
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
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200 transform hover:scale-105"
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
                      <FileText className="w-12 h-12 text-slate-400" />
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
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
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
                                      Serviced by {record.garages.name}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {record.notes && (
                            <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                              <p className="text-slate-700">{record.notes}</p>
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
        </div>

        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Are you a garage owner?
          </h3>
          <p className="text-slate-600 mb-6">
            Join Servitex to digitize your service records and provide transparency to your customers
          </p>
          <a
            href="/pricing"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}

export default VehicleLookupPage