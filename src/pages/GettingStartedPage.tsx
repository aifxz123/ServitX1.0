import React, { useState } from 'react'
import { Users, Car, ArrowRight, CheckCircle, CreditCard, FileText, Search, Plus } from 'lucide-react'

const GettingStartedPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'garages' | 'consumers'>('garages')

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Getting Started with Servitex
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know to get up and running quickly
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 rounded-xl p-1 inline-flex">
            <button
              onClick={() => setActiveTab('garages')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'garages'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              For Garages
            </button>
            <button
              onClick={() => setActiveTab('consumers')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'consumers'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-5 h-5 inline mr-2" />
              For Consumers
            </button>
          </div>
        </div>

        {/* Garages Content */}
        {activeTab === 'garages' && (
          <div className="space-y-16">
            {/* Account Creation */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                <h2 className="text-2xl font-serif font-bold mb-2">1. Create Your Account</h2>
                <p className="text-blue-100">Get your garage set up on Servitex in minutes</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Step-by-Step Setup</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <span className="text-blue-600 text-sm font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Visit the Garage Registration</h4>
                          <p className="text-slate-600 text-sm">Go to our "For Garages" page and click "Join Servitex"</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <span className="text-blue-600 text-sm font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Fill in Your Details</h4>
                          <p className="text-slate-600 text-sm">Provide your garage name, contact information, and business details</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <span className="text-blue-600 text-sm font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Account Verification</h4>
                          <p className="text-slate-600 text-sm">We'll verify your garage and send login credentials within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Required Information</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Garage business name
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Business email address
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Contact person details
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Business address (optional)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Companies House number (optional)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8">
                <h2 className="text-2xl font-serif font-bold mb-2">2. Choose Your Subscription</h2>
                <p className="text-green-100">Simple, transparent pricing with no hidden fees</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Subscription Details</h3>
                    <p className="text-slate-700 mb-6">
                      Simple, transparent pricing with everything you need to manage digital service records.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-slate-700">Unlimited service records</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-slate-700">Public vehicle lookup</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-slate-700">Secure cloud storage</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-slate-700">Professional branding</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-slate-700">14-day free trial included</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Billing Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CreditCard className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-900">Payment Methods</h4>
                          <p className="text-slate-600 text-sm">We accept all major credit and debit cards via Stripe</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <FileText className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-900">Billing Cycle</h4>
                          <p className="text-slate-600 text-sm">Monthly billing on the same date each month</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-900">Cancellation</h4>
                          <p className="text-slate-600 text-sm">Cancel anytime with no penalties or hidden fees</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Records */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
                <h2 className="text-2xl font-serif font-bold mb-2">3. Submit Service Records</h2>
                <p className="text-purple-100">Start building digital service history for your customers</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">How to Add Records</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Plus className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Access Your Dashboard</h4>
                          <p className="text-slate-600 text-sm">Log in and click "Add Service History" from your garage dashboard</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Car className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Enter Vehicle Details</h4>
                          <p className="text-slate-600 text-sm">Input the vehicle registration, service date, and mileage</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileText className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Select Services</h4>
                          <p className="text-slate-600 text-sm">Choose from our comprehensive list of service types and add notes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Secure Submission</h4>
                          <p className="text-slate-600 text-sm">Verify with your password and submit the record permanently</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Best Practices</h4>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span>Add records immediately after completing work</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span>Include detailed notes about work performed</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span>Double-check vehicle registration numbers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span>Record accurate mileage readings</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span>Include technician name for accountability</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consumers Content */}
        {activeTab === 'consumers' && (
          <div className="space-y-16">
            {/* Check Vehicle History */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8">
                <h2 className="text-2xl font-serif font-bold mb-2">How to Check Vehicle History</h2>
                <p className="text-green-100">Instantly access service records for any vehicle</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Simple 3-Step Process</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Visit the Lookup Page</h4>
                          <p className="text-slate-600 text-sm">Go to our "Vehicle Lookup" page - no account required</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Enter Registration</h4>
                          <p className="text-slate-600 text-sm">Type in the vehicle registration number (e.g., AB12 CDE)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">View Results</h4>
                          <p className="text-slate-600 text-sm">Instantly see all available service records and garage information</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-4">What You'll See</h4>
                    <ul className="space-y-3 text-sm text-blue-800">
                      <li className="flex items-center">
                        <Search className="w-4 h-4 text-blue-600 mr-2" />
                        Service date and type
                      </li>
                      <li className="flex items-center">
                        <Search className="w-4 h-4 text-blue-600 mr-2" />
                        Garage name and location
                      </li>
                      <li className="flex items-center">
                        <Search className="w-4 h-4 text-blue-600 mr-2" />
                        Mileage at time of service
                      </li>
                      <li className="flex items-center">
                        <Search className="w-4 h-4 text-blue-600 mr-2" />
                        Service notes and details
                      </li>
                      <li className="flex items-center">
                        <Search className="w-4 h-4 text-blue-600 mr-2" />
                        Technician information
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Missing Records */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8">
                <h2 className="text-2xl font-serif font-bold mb-2">What If Records Are Missing?</h2>
                <p className="text-orange-100">Steps to take when you can't find service history</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Common Reasons</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                          <span className="text-orange-600 text-xs">!</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Garage Not Using Servitex</h4>
                          <p className="text-slate-600 text-sm">The garage may not have joined our platform yet</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                          <span className="text-orange-600 text-xs">!</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Historical Records</h4>
                          <p className="text-slate-600 text-sm">Services before the garage joined won't appear automatically</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                          <span className="text-orange-600 text-xs">!</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Recent Services</h4>
                          <p className="text-slate-600 text-sm">Very recent work may not be uploaded yet</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">What You Can Do</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <ArrowRight className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-900">Contact Your Garage</h4>
                          <p className="text-slate-600 text-sm">Ask them to join Servitex and upload your service history</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <ArrowRight className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-900">Share Servitex</h4>
                          <p className="text-slate-600 text-sm">Tell other garages about our platform to expand coverage</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <ArrowRight className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-900">Contact Support</h4>
                          <p className="text-slate-600 text-sm">We can help connect you with participating garages in your area</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            {activeTab === 'garages' 
              ? "Join hundreds of garages already using Servitex to modernize their service records"
              : "Start checking vehicle service history instantly with Servitex"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {activeTab === 'garages' ? (
              <>
                <a
                  href="/garages"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Register Your Garage
                </a>
                <a
                  href="/pricing"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  View Pricing
                </a>
              </>
            ) : (
              <>
                <a
                  href="/lookup"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Check Vehicle History
                </a>
                <a
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Contact Support
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GettingStartedPage