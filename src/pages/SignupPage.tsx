import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Eye, EyeOff, Building, Mail, User, Phone, MapPin, FileText, Lock, AlertCircle, CheckCircle, Loader } from 'lucide-react'

const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    garageName: '',
    address: '',
    phone: '',
    companiesHouseNumber: '',
    password: '',
    confirmPassword: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [validatingCompany, setValidatingCompany] = useState(false)
  const [companyValidated, setCompanyValidated] = useState(false)
  const [companyName, setCompanyName] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Reset company validation when company number changes
    if (name === 'companiesHouseNumber') {
      setCompanyValidated(false)
      setCompanyName('')
    }
  }

  const validateCompanyNumber = async () => {
    const companyNumber = formData.companiesHouseNumber.trim()
    if (!companyNumber) {
      setError('Please enter a Companies House number')
      return
    }

    setValidatingCompany(true)
    setError('')

    try {
      console.log('Validating company number:', companyNumber)
      
      // Call our backend endpoint instead of Companies House API directly
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-company`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          companyNumber: companyNumber
        })
      })

      console.log('Backend API Response status:', response.status)
      
      const data = await response.json()
      console.log('Backend API Response data:', data)

      if (response.ok) {
        // Success response from backend
        setCompanyValidated(true)
        setCompanyName(data.company.name)
        setError('')
        console.log('Company validated successfully:', data.company.name)
      } else {
        // Error response from backend
        setError(data.error || 'Failed to validate company number. Please try again.')
        setCompanyValidated(false)
      }
    } catch (error) {
      console.error('Company validation error:', error)
      setError('Network error. Please check your internet connection and try again.')
      setCompanyValidated(false)
    } finally {
      setValidatingCompany(false)
    }
  }
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!formData.garageName.trim()) {
      setError('Garage name is required')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!companyValidated) {
      setError('Please validate your Companies House number before submitting')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!validateForm()) return

    setLoading(true)

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            garage_name: formData.garageName.trim()
          }
        }
      })

      if (authError) throw authError

      if (authData.user) {
        // Create garage record
        const { error: garageError } = await supabase
          .from('garages')
          .insert({
            id: authData.user.id,
            name: formData.garageName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim() || null,
            address: formData.address.trim() || null,
            subscription_status: 'inactive',
            companies_house_number: formData.companiesHouseNumber.trim() || null,
            full_name: formData.fullName.trim(),
            verification_status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (garageError) throw garageError

        setSuccess('Account created successfully! Redirecting to pricing...')
        
        // Clear form
        setFormData({
          fullName: '',
          email: '',
          garageName: '',
          address: '',
          phone: '',
          companiesHouseNumber: '',
          password: '',
          confirmPassword: ''
        })

        // Redirect to pricing page after a short delay
        setTimeout(() => {
          navigate('/pricing')
        }, 2000)
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      setError(error.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 text-center">
            <h1 className="text-3xl font-serif font-bold mb-2">
              Join Servitex
            </h1>
            <p className="text-green-100">
              Start your digital service record journey
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* Business Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Business Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="your@garage.com"
                  required
                />
              </div>

              {/* Garage Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Garage Name *
                </label>
                <input
                  type="text"
                  name="garageName"
                  value={formData.garageName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Your garage business name"
                  required
                />
              </div>

              {/* Garage Address (Optional) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Garage Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Your garage address"
                  required
                />
              </div>

              {/* Phone Number (Optional) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Your phone number"
                  required
                />
              </div>

              {/* Companies House Number */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Companies House Number * 
                  {companyValidated && <CheckCircle className="w-4 h-4 inline ml-2 text-green-500" />}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="companiesHouseNumber"
                    value={formData.companiesHouseNumber}
                    onChange={handleInputChange}
                    className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      companyValidated ? 'border-green-300 bg-green-50' : 'border-slate-300'
                    }`}
                    placeholder="e.g. 12345678"
                    required
                  />
                  <button
                    type="button"
                    onClick={validateCompanyNumber}
                    disabled={validatingCompany || !formData.companiesHouseNumber.trim()}
                    className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center space-x-2"
                  >
                    {validatingCompany ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    <span>{validatingCompany ? 'Checking...' : 'Validate'}</span>
                  </button>
                </div>
                {companyValidated && companyName && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">
                      ✅ <strong>Verified:</strong> {companyName}
                    </p>
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-700">{success}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-300 transition-colors"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-slate-600 text-sm">
                After creating your account, you'll be able to subscribe to access all features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage