import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft, Calendar, Gauge, CheckCircle, AlertCircle, Lock } from 'lucide-react'

interface ServiceCategory {
  name: string
  icon: string
  services: string[]
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: "🧰 General Maintenance & Repairs",
    icon: "🧰",
    services: [
      "Full Service",
      "Interim (Partial) Service", 
      "Oil & Filter Change",
      "Air Filter Replacement",
      "Fuel Filter Replacement",
      "Cabin/Pollen Filter Replacement",
      "Coolant Flush",
      "Brake Fluid Change",
      "Power Steering Fluid Change",
      "Timing Belt/Chain Replacement",
      "Spark Plug Replacement",
      "Battery Replacement"
    ]
  },
  {
    name: "🛞 Tyres & Wheels",
    icon: "🛞",
    services: [
      "Tyre Change",
      "Tyre Rotation", 
      "Wheel Alignment",
      "Wheel Balancing",
      "Alloy Wheel Repair"
    ]
  },
  {
    name: "🛑 Brakes & Suspension",
    icon: "🛑",
    services: [
      "Brake Pad Replacement",
      "Brake Disc Replacement",
      "Brake Caliper Repair/Replacement",
      "ABS Diagnostic",
      "Shock Absorber Replacement",
      "Coil Spring Replacement",
      "Suspension Bushes Replacement"
    ]
  },
  {
    name: "🔋 Diagnostics & Electrical",
    icon: "🔋",
    services: [
      "Engine Diagnostics",
      "ECU Remapping (Performance or Economy Tune)",
      "Battery & Charging System Test",
      "Alternator Replacement",
      "Starter Motor Replacement",
      "Electrical Wiring Repair",
      "DPF Regeneration/Cleaning"
    ]
  },
  {
    name: "🌬️ Heating, Air & Climate",
    icon: "🌬️",
    services: [
      "Air Conditioning Recharge",
      "Air Conditioning Leak Test",
      "Cabin Heater Repair",
      "Climate Control Diagnostics"
    ]
  },
  {
    name: "💡 Lights, Wipers & Glass",
    icon: "💡",
    services: [
      "Headlight/Bulb Replacement",
      "Windscreen Replacement",
      "Wiper Blade Replacement",
      "Electric Window Repair",
      "Window Tinting"
    ]
  },
  {
    name: "🚗 Bodywork & Cosmetic",
    icon: "🚗",
    services: [
      "Dent Removal",
      "Scratch & Paint Touch-Up",
      "Bumper Repair",
      "Detailing/Valeting",
      "Machine Polishing",
      "Ceramic Coating"
    ]
  },
  {
    name: "📦 Upgrades & Extras",
    icon: "📦",
    services: [
      "ECU Remap",
      "EGR Delete",
      "Exhaust Upgrade",
      "Suspension Lowering",
      "Induction Kit Installation",
      "Performance Brake Kit Installation",
      "Dash Cam Fitting",
      "Tow Bar Installation",
      "Audio System Upgrade"
    ]
  },
  {
    name: "📜 Admin & Inspections",
    icon: "📜",
    services: [
      "MOT Preparation",
      "Pre-Purchase Inspection",
      "Post-Accident Inspection",
      "Insurance Photos & Assessment"
    ]
  }
]

const AddServiceRecord: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1)
  
  // Get current UK date
  const getCurrentUKDate = () => {
    const now = new Date()
    const ukTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/London"}))
    return ukTime.toISOString().split('T')[0]
  }
  
  // Form data
  const [vehicleRegistration, setVehicleRegistration] = useState('')
  const [serviceDate, setServiceDate] = useState(getCurrentUKDate())
  const [mileage, setMileage] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
  
  // Submission modal
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [fullName, setFullName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Use the actual user ID as garage ID
  const garageId = user?.id || '4e616bfa-93d0-436d-a76b-21f85f61a312'

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (vehicleRegistration.trim()) {
      setCurrentStep(2)
    }
  }

  const handleDateMileageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (serviceDate && mileage) {
      setCurrentStep(3)
    }
  }

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const toggleCategory = (categoryName: string) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName)
      } else {
        newSet.add(categoryName)
      }
      return newSet
    })
  }

  const handleSubmitRecord = async () => {
    if (!fullName.trim() || !password.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setError('Please fill in all fields')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      // Verify password with Supabase Auth
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: password
      })

      if (authError) {
        setError('Password does not match. Service not uploaded.')
        setSubmitting(false)
        return
      }

      // Create service record
      const recordData = {
        garage_id: garageId,
        vehicle_registration: vehicleRegistration.toUpperCase(),
        service_date: serviceDate,
        mileage: parseInt(mileage),
        service_type: selectedServices.join(', '),
        notes: additionalInfo.trim() || null,
        technician_name: fullName.trim(),
        customer_email: customerEmail.trim(),
        customer_phone: customerPhone.trim()
      }

      const { error: insertError } = await supabase
        .from('service_records')
        .insert(recordData)

      if (insertError) throw insertError

      // Success - redirect back to garage dashboard
      navigate('/garage', { 
        state: { 
          message: 'Service record submitted successfully!',
          type: 'success'
        }
      })

    } catch (error) {
      console.error('Error submitting record:', error)
      setError('Failed to submit service record. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/garage')}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-serif font-bold text-slate-900">
                  Add Service History
                </h1>
                <p className="text-slate-600">Step {currentStep} of 3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Vehicle Registration */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Vehicle Registration
              </h2>
              <p className="text-slate-600">
                Enter the vehicle registration number
              </p>
            </div>

            <form onSubmit={handleRegistrationSubmit} className="max-w-md mx-auto">
              <div className="mb-6">
                <input
                  type="text"
                  value={vehicleRegistration}
                  onChange={(e) => setVehicleRegistration(e.target.value.toUpperCase())}
                  className="w-full px-6 py-4 text-center text-2xl font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase tracking-wider"
                  placeholder="AB12 CDE"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Date and Mileage */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Service Details
              </h2>
              <p className="text-slate-600">
                When was the service performed and what was the mileage?
              </p>
            </div>

            <form onSubmit={handleDateMileageSubmit} className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Service Date
                </label>
                <input
                  type="date"
                  value={serviceDate}
                  max={getCurrentUKDate()}
                  min={getCurrentUKDate()}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Gauge className="w-4 h-4 inline mr-2" />
                  Mileage
                </label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 45000"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Service Selection */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Select Services Performed
                </h2>
                <p className="text-slate-600">
                  Choose all services that were performed on {vehicleRegistration}
                </p>
              </div>

              {/* Service Categories */}
              <div className="space-y-4 mb-8">
                {SERVICE_CATEGORIES.map((category) => (
                  <div key={category.name} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left flex items-center justify-between"
                    >
                      <span className="font-medium text-slate-900">{category.name}</span>
                      <span className="text-slate-400">
                        {collapsedCategories.has(category.name) ? '▼' : '▲'}
                      </span>
                    </button>
                    
                    {!collapsedCategories.has(category.name) && (
                      <div className="p-6 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {category.services.map((service) => (
                            <label
                              key={service}
                              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedServices.includes(service)
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(service)}
                                onChange={() => toggleService(service)}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                                selectedServices.includes(service)
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-slate-300'
                              }`}>
                                {selectedServices.includes(service) && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span className="text-slate-700">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Information */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Any additional information
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Additional service details, parts used, recommendations, etc..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowSubmissionModal(true)}
                  disabled={selectedServices.length === 0}
                  className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Record
                </button>
                {selectedServices.length === 0 && (
                  <p className="text-slate-500 text-sm mt-2">
                    Please select at least one service to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submission Modal */}
        {showSubmissionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Secure Submission
                </h2>
                <p className="text-slate-600">
                  Please verify your identity to submit this service record
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="customer@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Customer Phone
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Customer phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Account Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your account password"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowSubmissionModal(false)
                      setFullName('')
                      setCustomerEmail('')
                      setCustomerPhone('')
                      setPassword('')
                      setError('')
                    }}
                    className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitRecord}
                    disabled={submitting}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-300 transition-colors"
                  >
                    {submitting ? 'Submitting...' : 'Submit Record'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddServiceRecord