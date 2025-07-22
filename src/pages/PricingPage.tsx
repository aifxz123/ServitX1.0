import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../hooks/useSubscription'
import { STRIPE_CONFIG, formatCurrency } from '../stripe-config'
import { Check, Star, Clock, Shield, Users } from 'lucide-react'

const PricingPage: React.FC = () => {
  const { user } = useAuth()
  const { subscription, isActive } = useSubscription()
  const navigate = useNavigate()

  const product = STRIPE_CONFIG.products[0] // Servitex Professional

  const handleGetStarted = () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (isActive()) {
      navigate('/garage')
      return
    }

    navigate(`/checkout?price_id=${product.priceId}`)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to modernize your garage's service records
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </div>
              <div className="mb-4">
                <span className="text-5xl font-bold">{formatCurrency(product.price)}</span>
                <span className="text-xl opacity-90">/{product.interval}</span>
              </div>
              <p className="text-blue-100">
                {product.description}
              </p>
              {product.trialPeriodDays && (
                <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm font-medium">
                    🎉 {product.trialPeriodDays}-day free trial included
                  </p>
                </div>
              )}
            </div>

            <div className="p-8">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Unlimited service records</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Public vehicle lookup</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Secure cloud storage</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Mobile-friendly interface</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Customer transparency</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Professional branding</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Email support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Cancel anytime</span>
                </li>
              </ul>

              {/* Current subscription status */}
              {user && subscription && (
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Current Subscription</h3>
                  <p className="text-blue-700 text-sm">
                    Status: <span className="font-medium capitalize">{subscription.subscription_status}</span>
                    {subscription.current_period_end && (
                      <> • Next billing: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</>
                    )}
                  </p>
                </div>
              )}

              <button
                onClick={handleGetStarted}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {!user ? 'Sign Up to Get Started' :
                 isActive() ? 'Go to Dashboard' :
                 product.trialPeriodDays ? `Start ${product.trialPeriodDays}-Day Free Trial` :
                 'Subscribe Now'}
              </button>

              <p className="text-center text-slate-500 text-sm mt-4">
                {product.trialPeriodDays && `${product.trialPeriodDays}-day free trial • `}
                No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6 text-center">
            Why Garages Choose Servitex
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Quick Setup</h4>
              <p className="text-slate-600">
                Get started in minutes with our intuitive interface
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Secure & Compliant</h4>
              <p className="text-slate-600">
                Enterprise-grade security with GDPR compliance
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Grow Your Business</h4>
              <p className="text-slate-600">
                Build trust with customers through transparency
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Questions about pricing?{' '}
            <a href="mailto:support@servitex.com" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PricingPage