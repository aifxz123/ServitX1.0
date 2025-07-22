import React from 'react'
import { Link } from 'react-router-dom'
import { useSubscription } from '../hooks/useSubscription'
import { CheckCircle, Clock, AlertCircle, CreditCard } from 'lucide-react'

const SubscriptionStatus: React.FC = () => {
  const { subscription, loading, isActive, isPending, isCanceled, getProductInfo } = useSubscription()

  if (loading) {
    return (
      <div className="bg-slate-50 rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <div>
            <h3 className="font-semibold text-yellow-800">No Subscription</h3>
            <p className="text-yellow-700 text-sm">
              Subscribe to access all features.{' '}
              <Link to="/pricing" className="underline hover:no-underline">
                View plans
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const productInfo = getProductInfo()

  if (isActive()) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <h3 className="font-semibold text-green-800">
              {subscription.subscription_status === 'trialing' ? 'Free Trial Active' : 'Subscription Active'}
            </h3>
            <p className="text-green-700 text-sm">
              {productInfo?.name || 'Servitex Professional'}
              {subscription.current_period_end && (
                <> • Next billing: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</>
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isPending()) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-800">Subscription Pending</h3>
            <p className="text-blue-700 text-sm">
              Your subscription is being set up.{' '}
              <Link to="/pricing" className="underline hover:no-underline">
                Complete setup
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isCanceled()) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <h3 className="font-semibold text-red-800">Subscription Cancelled</h3>
            <p className="text-red-700 text-sm">
              Your subscription has been cancelled.{' '}
              <Link to="/pricing" className="underline hover:no-underline">
                Reactivate
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="flex items-center space-x-2">
        <CreditCard className="w-5 h-5 text-slate-600" />
        <div>
          <h3 className="font-semibold text-slate-800">Subscription Status</h3>
          <p className="text-slate-700 text-sm capitalize">
            {subscription.subscription_status?.replace('_', ' ')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionStatus