import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Garage, ServiceRecord } from '../lib/supabase'
import { Users, FileText, Download, Calendar, Wrench, Edit2, Trash2, AlertCircle, CheckCircle } from 'lucide-react'

const AdminDashboard: React.FC = () => {
  const [garages, setGarages] = useState<Garage[]>([])
  const [records, setRecords] = useState<ServiceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<'overview' | 'garages' | 'records'>('overview')
  const [editingRecord, setEditingRecord] = useState<ServiceRecord | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [garagesRes, recordsRes] = await Promise.all([
        supabase.from('garages').select('*').order('created_at', { ascending: false }),
        supabase.from('service_records').select(`
          *,
          garages (name, email)
        `).order('created_at', { ascending: false })
      ])

      if (garagesRes.error) throw garagesRes.error
      if (recordsRes.error) throw recordsRes.error

      setGarages(garagesRes.data || [])
      setRecords(recordsRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Vehicle Registration', 'Service Type', 'Garage', 'Notes']
    const rows = records.map(record => [
      record.service_date,
      record.vehicle_registration,
      record.service_type,
      record.garages?.name || 'Unknown',
      record.notes || ''
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `servitex-records-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDeleteRecord = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_records')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setRecords(records.filter(record => record.id !== id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting record:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-UK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600">
              Monitor garages and service records across the platform (Demo Mode)
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => setActiveView('garages')}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total Garages</p>
              <p className="text-3xl font-bold text-slate-900">{garages.length}</p>
              <p className="text-blue-600 text-sm mt-1">Click to view all</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveView('records')}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Service Records</p>
              <p className="text-3xl font-bold text-slate-900">{records.length}</p>
              <p className="text-green-600 text-sm mt-1">Click to manage</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Active Subscriptions</p>
              <p className="text-3xl font-bold text-slate-900">
                {garages.filter(g => g.subscription_status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Wrench className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      {activeView !== 'overview' && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-6">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveView('overview')}
                className="py-4 px-2 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium text-sm"
              >
                ← Back to Overview
              </button>
              <button
                onClick={() => setActiveView('garages')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeView === 'garages'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Garages ({garages.length})
              </button>
              <button
                onClick={() => setActiveView('records')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeView === 'records'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Service Records ({records.length})
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Content Views */}
      {activeView === 'overview' && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Admin Overview</h2>
            <p className="text-slate-600 mb-8">
              Click on the cards above to view and manage garages or service records
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Recent Activity</h3>
                <p className="text-blue-700 text-sm">
                  {records.length > 0 ? `Latest service: ${formatDate(records[0]?.service_date)}` : 'No recent activity'}
                </p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-green-900 mb-2">System Status</h3>
                <p className="text-green-700 text-sm">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'garages' && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="p-6">
            <div className="space-y-4">
              {garages.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No Garages Found</h3>
                  <p className="text-slate-600">No garages have registered yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Garage</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Contact</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {garages.map((garage) => (
                        <tr key={garage.id} className="border-b border-slate-100">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-slate-900">{garage.name}</p>
                              {garage.address && (
                                <p className="text-sm text-slate-600">{garage.address}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-slate-900">{garage.email}</p>
                              {garage.phone && (
                                <p className="text-sm text-slate-600">{garage.phone}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(garage.subscription_status)}
                          </td>
                          <td className="py-4 px-4 text-slate-600">
                            {formatDate(garage.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeView === 'records' && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="p-6">
            <div className="space-y-4">
              {records.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No Service Records</h3>
                  <p className="text-slate-600">No service records have been created yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Vehicle</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Service</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Garage</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record) => (
                        <tr key={record.id} className="border-b border-slate-100">
                          <td className="py-4 px-4">
                            <p className="font-medium text-slate-900">{record.vehicle_registration}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-slate-900">{record.service_type}</p>
                              {record.notes && (
                                <p className="text-sm text-slate-600 mt-1">{record.notes}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-slate-900">{record.garages?.name || 'Unknown'}</p>
                          </td>
                          <td className="py-4 px-4 text-slate-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(record.service_date)}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setEditingRecord(record)}
                                className="text-slate-400 hover:text-blue-600 transition-colors"
                                title="Edit record"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(record.id)}
                                className="text-slate-400 hover:text-red-600 transition-colors"
                                title="Delete record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Edit Service Record
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vehicle Registration
                </label>
                <input
                  type="text"
                  value={editingRecord.vehicle_registration}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Service Type
                </label>
                <input
                  type="text"
                  value={editingRecord.service_type}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={editingRecord.notes || ''}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-6">
              <button
                onClick={() => setEditingRecord(null)}
                className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: Implement edit functionality
                  setEditingRecord(null)
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Delete Service Record
              </h2>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete this service record? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteRecord(deleteConfirm)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard