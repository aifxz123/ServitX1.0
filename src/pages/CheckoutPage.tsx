import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { STRIPE_CONFIG, formatCurrency } from '../stripe-config'
import { CreditCard, Check, ArrowLeft, AlertCircle, Clock, Shield, Users } from 'lucide-react'

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Get product from URL params
  const priceId = searchParams.get('price_id')
  const product = STRIPE_CONFIG.products.find(p => p.priceId === priceId)

  // Check if user was redirected from a cancelled payment
  const wasCancelled = searchParams.get('canceled') === 'true'

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    if (!product) {
      navigate('/pricing')
      return
    }
  }, [user, product, navigate])

  useEffect(() => {
    if (wasCancelled) {
      setError('Payment was cancelled. You can try again when ready.')
    }
  }, [wasCancelled])

  const handleCheckout = async () => {
    if (!user || !product) return

    setLoading(true)
    setError('')
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('No active session')
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/checkout?price_id=${product.priceId}&canceled=true`
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      setError(error.message || 'Failed to start checkout process')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToPricing = () => {
    navigate('/pricing')
  }

  if (!user || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
            <h1 className="text-3xl font-serif font-bold mb-2">
              Complete Your Subscription
            </h1>
            <p className="text-blue-100">
              {product.trialPeriodDays && `Start your ${product.trialPeriodDays}-day free trial today`}
            </p>
          </div>

          <div className="p-8">
            {/* Back Button */}
            <button
              onClick={handleBackToPricing}
              className="flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to pricing
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-2 mb-6">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Subscription Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Plan:</span>
                  <span className="font-medium text-slate-900">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Description:</span>
                  <span className="font-medium text-slate-900 text-right max-w-xs">{product.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Email:</span>
                  <span className="font-medium text-slate-900">{user.email}</span>
                </div>
                
                <div className="border-t border-slate-200 pt-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-900">{product.name}</span>
                    <span className="text-2xl font-bold text-slate-900">
                      {formatCurrency(product.price)}/{product.interval}
                    </span>
                  </div>
                  {product.trialPeriodDays && (
                    <div className="flex items-center mt-2">
                      <Clock className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-600 font-medium">
                        {product.trialPeriodDays}-day free trial included
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Features Included */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">What's Included:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Unlimited service records</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Public vehicle lookup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Secure cloud storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Professional branding</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Mobile-friendly interface</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Email support</span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Shield className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-900">Secure Payment</span>
                  <span className="text-xs text-blue-700">256-bit SSL encryption</span>
                </div>
                {product.trialPeriodDays && (
                  <div className="flex flex-col items-center">
                    <Clock className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-green-900">{product.trialPeriodDays}-Day Free Trial</span>
                    <span className="text-xs text-green-700">No charges until trial ends</span>
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <Users className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-900">Cancel Anytime</span>
                  <span className="text-xs text-purple-700">No long-term commitment</span>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <CreditCard className="w-5 h-5" />
              <span>
                {loading ? 'Starting checkout...' : 
                 product.trialPeriodDays ? `Start ${product.trialPeriodDays}-Day Free Trial` : 
                 'Subscribe Now'}
              </span>
            </button>

            <p className="text-center text-slate-500 text-sm mt-4">
              Secure payment powered by Stripe • Cancel anytime
              {product.trialPeriodDays && ' during trial'}
            </p>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-slate-600 text-sm">
                Questions? Contact us at{' '}
                <a href="mailto:support@servitex.com" className="text-blue-600 hover:text-blue-700">
                  support@servitex.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage