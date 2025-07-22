import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { getProductByPriceId } from '../stripe-config'

export interface SubscriptionData {
  customer_id: string | null
  subscription_id: string | null
  subscription_status: string | null
  price_id: string | null
  current_period_start: number | null
  current_period_end: number | null
  cancel_at_period_end: boolean | null
  payment_method_brand: string | null
  payment_method_last4: string | null
}

export function useSubscription() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setSubscription(null)
      setLoading(false)
      return
    }

    fetchSubscription()
  }, [user])

  const fetchSubscription = async () => {
    try {
      setLoading(true)
      setError(null)

      // For Premium Auto Service (demo account), return mock active subscription
      if (user?.email === 'contact@premiumauto.com') {
        setSubscription({
          customer_id: 'cus_demo_premium_auto',
          subscription_id: 'sub_demo_premium_auto',
          subscription_status: 'active',
          price_id: 'price_1Rk1MSCNcobksMJa9zJvZAHd',
          current_period_start: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60), // 30 days ago
          current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days from now
          cancel_at_period_end: false,
          payment_method_brand: 'visa',
          payment_method_last4: '4242'
        })
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle()

      if (error) {
        throw error
      }

      setSubscription(data)
    } catch (err: any) {
      console.error('Error fetching subscription:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getProductInfo = () => {
    if (!subscription?.price_id) return null
    return getProductByPriceId(subscription.price_id)
  }

  const isActive = () => {
    return subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing'
  }

  const isPending = () => {
    return subscription?.subscription_status === 'incomplete' || subscription?.subscription_status === 'not_started'
  }

  const isCanceled = () => {
    return subscription?.subscription_status === 'canceled'
  }

  return {
    subscription,
    loading,
    error,
    refetch: fetchSubscription,
    getProductInfo,
    isActive,
    isPending,
    isCanceled
  }
}