import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useSubscription } from '../hooks/useSubscription'
import { CheckCircle, Clock, Mail, CreditCard, AlertCircle } from 'lucide-react'

const CheckoutSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { subscription, loading, refetch } = useSubscription()
  const [verificationStatus, setVerificationStatus] = useState<'processing' | 'completed' | 'error'>('processing')

  useEffect(() => {
    if (!sessionId) {
      setVerificationStatus('error')
      return
    }

    // Poll for subscription updates
    const pollSubscription = async () => {
      let attempts = 0
      const maxAttempts = 10
      
      const poll = async () => {
        attempts++
        await refetch()
        
        if (attempts >= maxAttempts) {
          setVerificationStatus('completed')
          return
        }
        
        setTimeout(poll, 2000) // Poll every 2 seconds
      }
      
      // Initial delay to allow webhook processing
      setTimeout(poll, 3000)
    }

    pollSubscription()
  }, [sessionId, refetch])

  useEffect(() => {
    if (!loading && subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing') {
      setVerificationStatus('completed')
    }
  }, [loading, subscription])

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-serif font-bold mb-2">
                Verification Error
              </h1>
              <p className="text-red-100">
                No payment session found
              </p>
            </div>
            <div className="p-8 text-center">
              <p className="text-slate-600 mb-6">
                It looks like you arrived here without completing a payment. Please try the checkout process again.
              </p>
              <Link
                to="/pricing"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              {verificationStatus === 'completed' ? (
                <CheckCircle className="w-8 h-8 text-white" />
              ) : verificationStatus === 'error' ? (
                <AlertCircle className="w-8 h-8 text-white" />
              ) : (
                <Clock className="w-8 h-8 text-white animate-pulse" />
              )}
            </div>
            <h1 className="text-3xl font-serif font-bold mb-2">
              {verificationStatus === 'completed' ? 'Welcome to Servitex!' :
               verificationStatus === 'error' ? 'Payment Issue' :
               'Processing Your Payment...'}
            </h1>
            <p className="text-green-100">
              {verificationStatus === 'completed' ? 'Your subscription is ready to use' :
               verificationStatus === 'error' ? 'There was an issue with your payment' :
               'Please wait while we set up your subscription'}
            </p>
          </div>

          <div className="p-8">
            {verificationStatus === 'processing' && (
              <>
                <div className="text-center mb-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                    Setting Up Your Subscription
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We're processing your payment and setting up your Servitex subscription. This should only take a moment.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Payment Received</h3>
                      <p className="text-green-700 text-sm">Your payment has been successfully processed</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
                    <div>
                      <h3 className="font-semibold text-blue-900">Creating Subscription</h3>
                      <p className="text-blue-700 text-sm">Setting up your garage dashboard and features</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <Clock className="w-6 h-6 text-slate-400" />
                    <div>
                      <h3 className="font-semibold text-slate-600">Finalizing Setup</h3>
                      <p className="text-slate-500 text-sm">Almost ready to go...</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {verificationStatus === 'completed' && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                    🎉 Subscription Successfully Activated!
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Your Servitex subscription is now active and ready to use. You can start adding service records immediately.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Payment Confirmed</h3>
                      <p className="text-green-700 text-sm">
                        {subscription?.subscription_status === 'trialing' ? 'Free trial started' : 'Subscription activated'}
                        {subscription?.current_period_end && (
                          <> • Next billing: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Subscription Activated</h3>
                      <p className="text-green-700 text-sm">Your garage dashboard is ready to use</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Features Unlocked</h3>
                      <p className="text-green-700 text-sm">All professional features are now available</p>
                    </div>
                  </div>
                </div>

                {subscription && (
                  <div className="bg-blue-50 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Your Subscription Details
                    </h3>
                    <div className="space-y-2 text-blue-700">
                      <div className="flex justify-between">
                        <span>Plan:</span>
                        <span className="font-medium">Servitex Professional</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium capitalize text-green-700">
                          {subscription.subscription_status === 'trialing' ? 'Free Trial' : subscription.subscription_status}
                        </span>
                      </div>
                      {subscription.current_period_end && (
                        <div className="flex justify-between">
                          <span>Next billing:</span>
                          <span className="font-medium">
                            {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/garage"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    Access Your Dashboard
                  </Link>
                  <Link
                    to="/"
                    className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors text-center"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </>
            )}

            {verificationStatus === 'error' && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                    Payment Verification Issue
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    There was an issue verifying your payment. Please contact support or try again.
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    What to do next:
                  </h3>
                  <ul className="text-red-700 space-y-1">
                    <li>• Check your email for payment confirmation</li>
                    <li>• Contact support if payment was charged</li>
                    <li>• Try the checkout process again</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/pricing"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    Try Again
                  </Link>
                  <a
                    href="mailto:support@servitex.com"
                    className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors text-center"
                  >
                    Contact Support
                  </a>
                </div>
              </>
            )}

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <div className="flex items-center justify-center space-x-2 text-slate-500">
                <Mail className="w-4 h-4" />
                <span className="text-sm">
                  Need help? Email us at{' '}
                  <a href="mailto:support@servitex.com" className="text-blue-600 hover:text-blue-700">
                    support@servitex.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage