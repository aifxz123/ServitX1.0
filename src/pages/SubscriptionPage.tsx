import React from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CreditCard, Check } from 'lucide-react'

const SubscriptionPage: React.FC = () => {
  const handleStripeCheckout = () => {
    // For demo purposes, we'll show an alert
    alert('Stripe integration would be implemented here. This would redirect to Stripe Checkout for subscription payment.')
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-yellow-50 border-b border-yellow-200 p-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              <div>
                <h1 className="text-2xl font-bold text-yellow-800">Subscription Required</h1>
                <p className="text-yellow-700">
                  Please activate your subscription to access the garage dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl mb-6">
                <h2 className="text-2xl font-bold mb-2">Professional Plan</h2>
                <div className="mb-2">
                  <span className="text-4xl font-bold">£20</span>
                  <span className="text-xl opacity-90">/month</span>
                </div>
                <p className="text-blue-100">
                  Everything you need to manage service records
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Unlimited service records</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Public vehicle lookup</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Secure cloud storage</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Professional branding</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Email support</span>
              </div>
            </div>

            <button
              onClick={handleStripeCheckout}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Subscribe Now</span>
            </button>

            <p className="text-center text-slate-500 text-sm mt-4">
              14-day free trial • No setup fees • Cancel anytime
            </p>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-slate-600">
                Need help?{' '}
                <Link to="/lookup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage