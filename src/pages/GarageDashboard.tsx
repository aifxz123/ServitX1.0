import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../hooks/useSubscription'
import type { ServiceRecord } from '../lib/supabase'
import SubscriptionStatus from '../components/SubscriptionStatus'
import { Plus, Calendar, FileText, AlertCircle, CheckCircle, Gauge } from 'lucide-react'

const GarageDashboard: React.FC = () => {
  const { user } = useAuth()
  const { isActive } = useSubscription()
  const [records, setRecords] = useState<ServiceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()

  // Use the actual user ID as garage ID for Premium Auto Service
  const garageId = user?.id || '4e616bfa-93d0-436d-a76b-21f85f61a312'
  const garageName = user?.email === 'contact@premiumauto.com' ? 'Premium Auto Service' : 'Your Garage'

  useEffect(() => {
    fetchRecords()
  }, [])

  // Show success message if redirected from add record page
  useEffect(() => {
    if (location.state?.message) {
      // You could implement a toast notification here
      console.log(location.state.message)
    }
  }, [location.state])

  const fetchRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('service_records')
        .select('*')
        .eq('garage_id', garageId)
        .order('service_date', { ascending: false })

      if (error) throw error
      setRecords(data || [])
    } catch (error) {
      console.error('Error fetching records:', error)
      setError('Failed to load service history')
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
    if (serviceType.toLowerCase().includes('full service')) {
      return <CheckCircle className="w-5 h-5 text-blue-600" />
    }
    return <CheckCircle className="w-5 h-5 text-slate-600" />
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
      {/* Success Message */}
      {location.state?.message && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-green-700">{location.state.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
              Welcome back, {garageName}
            </h1>
            <p className="text-slate-600">
              Manage your service history and track your work
            </p>
          </div>
          {isActive() ? (
            <Link
              to="/add-service"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Service History</span>
            </Link>
          ) : (
            <Link
              to="/pricing"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Subscribe to Add Records
            </Link>
          )}
        </div>

      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Service History */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Service History</h2>
          <p className="text-slate-600 mt-1">
            {records.length} {records.length === 1 ? 'record' : 'records'} total
          </p>
        </div>

        <div className="p-6">
          {records.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Service History Yet
              </h3>
              <p className="text-slate-600 mb-6">
                Start by adding your first service record to build your digital history
              </p>
              {isActive() ? (
                <Link
                  to="/add-service"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Add First Record
                </Link>
              ) : (
                <Link
                  to="/pricing"
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Subscribe to Get Started
                </Link>
              )}
            </div>
          ) : (
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
                          <span className="font-medium">
                            {record.vehicle_registration}
                          </span>
                          {record.mileage && (
                            <span className="flex items-center">
                              <Gauge className="w-4 h-4 mr-1" />
                              {record.mileage.toLocaleString()} miles
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

                  {record.technician_name && (
                    <div className="mt-3 text-sm text-slate-500">
                      Technician: {record.technician_name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GarageDashboard