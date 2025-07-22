export const STRIPE_CONFIG = {
  products: [
    {
      id: 'prod_SfM4zAvFXogBdv',
      priceId: 'price_1Rk1MSCNcobksMJa9zJvZAHd',
      name: 'Servitex Professional',
      description: 'Monthly subscription for garages to access digital service record tools',
      mode: 'subscription' as const,
      price: 2000, // £20.00 in pence
      currency: 'gbp',
      interval: 'month',
      trialPeriodDays: 14
    }
  ]
} as const

export type StripeProduct = typeof STRIPE_CONFIG.products[0]

// Helper function to get product by price ID
export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return STRIPE_CONFIG.products.find(product => product.priceId === priceId)
}

// Helper function to format currency
export const formatCurrency = (amount: number, currency = 'GBP') => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100)
}