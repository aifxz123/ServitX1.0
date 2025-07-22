import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Check, X, Eye, EyeOff, AlertCircle, CheckCircle, Play, Mail, Phone, User, Building } from 'lucide-react'

const GaragesPage: React.FC = () => {
  const { user, userType, login } = useAuth()
  const navigate = useNavigate()
  
  // Login form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  
  // Contact form state
  const [garageName, setGarageName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [message, setMessage] = useState('')
  const [contactLoading, setContactLoading] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)

  // Redirect if already logged in as garage user
  useEffect(() => {
    if (user && userType === 'garage') {
      navigate('/garage')
    }
  }, [user, userType, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      const success = await login(email, password)
      if (success) {
        if (email === 'contact@premiumauto.com') {
          navigate('/garage')
        } else {
          setLoginError('This account is not registered as a garage')
        }
      } else {
        setLoginError('Invalid email or password')
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setContactSuccess(true)
      setContactLoading(false)
      // Reset form
      setGarageName('')
      setContactPerson('')
      setContactEmail('')
      setContactPhone('')
      setMessage('')
    }, 1000)
  }

  // Don't render if user is logged in (will redirect)
  if (user && userType === 'garage') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section with Split Layout */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Transform Your Garage with Digital Records
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join hundreds of garages already using Servitex to modernize their service records and build customer trust
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Benefits */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 h-full flex flex-col">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                Benefits of Digital Record-Keeping
              </h2>
              
              <div className="space-y-4 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-slate-700">Instantly share service history with customers</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🤝</span>
                  <span className="text-slate-700">Build long-term trust and loyalty</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🗂️</span>
                  <span className="text-slate-700">Centralise records for every vehicle</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💼</span>
                  <span className="text-slate-700">Look more professional and tech-forward</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500 text-center">
                  Join hundreds of garages already modernizing their service records
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 h-full flex flex-col">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
                Garage Login
              </h2>
              
              <form onSubmit={handleLogin} className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
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

                {loginError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-700 text-sm">{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {loginLoading ? 'Signing in...' : 'Login'}
                </button>
              </form>

              <div className="mt-4 text-center space-y-2">
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                  Forgot password?
                </a>
                <br />
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                  Need help?
                </a>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">Test Credentials</h3>
                  <div className="text-xs text-slate-600">
                    <p><strong>Email:</strong> contact@premiumauto.com</p>
                    <p><strong>Password:</strong> password123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manual vs Servitex Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Manual vs. Servitex
            </h2>
            <p className="text-xl text-slate-600">
              See the difference digital record-keeping makes
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Manual Column */}
              <div className="p-8 border-r border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                  Manual Record Keeping
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-slate-700">Paper invoices or messy spreadsheets</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-slate-700">No easy sharing with customers</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-slate-700">Risk of data loss</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-slate-700">Hard to find history by reg</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-slate-700">Doesn't build reputation</span>
                  </div>
                </div>
              </div>

              {/* Servitex Column */}
              <div className="p-8 bg-gradient-to-br from-blue-50 to-white">
                <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">
                  Using Servitex
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Cloud-based storage</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Instant online history</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Secure backups</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Quick lookup by reg</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Customer-facing transparency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            A sneak peek at your Garage Portal dashboard
          </h2>
          
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 mb-8">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-slate-600 font-medium">Dashboard Preview</p>
                <p className="text-slate-500 text-sm">Interactive demo coming soon</p>
              </div>
            </div>
          </div>
          
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Add My Garage Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Add My Garage
            </h2>
            <p className="text-xl text-slate-600">
              Ready to get started? Tell us about your garage and we'll be in touch
            </p>
          </div>

          {contactSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-2 mb-8">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700">Thanks! We'll be in touch shortly.</span>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Garage Name
                </label>
                <input
                  type="text"
                  value={garageName}
                  onChange={(e) => setGarageName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your garage name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Contact Person
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message / Business Details
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your garage, number of vehicles you service, any specific requirements..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={contactLoading}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-300 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {contactLoading ? 'Submitting...' : 'Join Servitex'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GaragesPage