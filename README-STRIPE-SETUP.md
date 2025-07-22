# Stripe SaaS Integration Setup Guide

This guide will help you set up the complete Stripe integration for Servitex's £20/month subscription service.

## 🚀 Quick Setup Checklist

### 1. Create Stripe Account & Product
- [ ] Sign up at [stripe.com](https://stripe.com)
- [ ] Switch to **Test mode** (toggle in top right)
- [ ] Create product: "Servitex Professional"
- [ ] Set price: £20.00/month recurring
- [ ] Enable 14-day free trial
- [ ] Copy the **Price ID** (starts with `price_`)

### 2. Get Stripe API Keys
- [ ] Go to **Developers → API Keys**
- [ ] Copy **Publishable key** (starts with `pk_test_`)
- [ ] Copy **Secret key** (starts with `sk_test_`)

### 3. Configure Environment Variables

#### Frontend (.env file)
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_STRIPE_PRICE_ID=price_your_price_id_here
```

#### Supabase Edge Functions
In your Supabase dashboard → Edge Functions → Secrets:
```
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PRICE_ID=price_your_price_id_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 4. Set Up Webhooks
- [ ] Go to **Developers → Webhooks** in Stripe
- [ ] Click **Add endpoint**
- [ ] URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
- [ ] Select events:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_failed`
- [ ] Copy the **Signing secret** (starts with `whsec_`)

## 📋 Detailed Setup Steps

### Step 1: Create Stripe Product

1. **Login to Stripe Dashboard**
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com)
   - Make sure you're in **Test mode**

2. **Create Product**
   - Go to **Products** in the left sidebar
   - Click **Add product**
   - **Name**: "Servitex Professional"
   - **Description**: "Monthly subscription for garage service record management"

3. **Set Up Pricing**
   - **Price**: £20.00
   - **Billing period**: Monthly
   - **Currency**: GBP (British Pound)
   - **Trial period**: 14 days
   - Click **Save product**

4. **Copy Price ID**
   - After saving, you'll see a Price ID like `price_1234567890abcdef`
   - Copy this - you'll need it for configuration

### Step 2: Configure Supabase Edge Functions

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Go to **Edge Functions** in the sidebar

2. **Add Environment Variables**
   - Look for **Environment Variables** or **Secrets** section
   - Add these three variables:

   ```
   STRIPE_SECRET_KEY = sk_test_your_secret_key_from_stripe
   STRIPE_PRICE_ID = price_your_price_id_from_step_1
   STRIPE_WEBHOOK_SECRET = whsec_will_get_this_in_step_3
   ```

### Step 3: Set Up Webhooks

1. **In Stripe Dashboard**
   - Go to **Developers → Webhooks**
   - Click **Add endpoint**

2. **Configure Endpoint**
   - **Endpoint URL**: `https://your-project-ref.supabase.co/functions/v1/stripe-webhook`
   - Replace `your-project-ref` with your actual Supabase project reference

3. **Select Events**
   - Click **Select events**
   - Choose these events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`

4. **Get Webhook Secret**
   - After creating the webhook, click on it
   - In the **Signing secret** section, click **Reveal**
   - Copy the secret (starts with `whsec_`)
   - Add this to your Supabase Edge Function environment variables

### Step 4: Test the Integration

1. **Update Your .env File**
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   VITE_STRIPE_PRICE_ID=price_your_price_id
   ```

2. **Test Payment Flow**
   - Go to `/garage-signup`
   - Fill out the form (or skip with the current setup)
   - Click "Continue to Payment"
   - Click "Start 14-Day Free Trial"
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future date for expiry
   - Any 3-digit CVC

3. **Verify Database Updates**
   - Check your `garages` table in Supabase
   - Should see `stripe_customer_id` and `subscription_status: 'active'`

## 🧪 Test Cards

Use these test cards in Stripe's test mode:

- **Successful payment**: `4242 4242 4242 4242`
- **Declined payment**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

## 🔧 Troubleshooting

### Common Issues:

1. **"STRIPE_SECRET_KEY not configured"**
   - Make sure you've added the secret key to Supabase Edge Functions
   - Verify the key starts with `sk_test_`

2. **"Invalid price ID"**
   - Double-check the price ID in both frontend and backend
   - Make sure it starts with `price_`

3. **Webhook not receiving events**
   - Verify the webhook URL is correct
   - Check that the webhook secret is properly set
   - Ensure the selected events include the ones we're handling

4. **Payment succeeds but database not updated**
   - Check webhook configuration
   - Look at Edge Function logs in Supabase
   - Verify webhook secret is correct

## 🚀 Going Live

When ready for production:

1. **Switch Stripe to Live Mode**
2. **Create new product in Live Mode**
3. **Update environment variables with live keys**
4. **Update webhook endpoint to production URL**
5. **Test with real payment methods**

## 📞 Support

If you encounter issues:
- Check Stripe Dashboard → Logs for payment details
- Check Supabase → Edge Functions → Logs for webhook processing
- Verify all environment variables are set correctly

---

**Security Note**: Never commit API keys to version control. Always use environment variables for sensitive data.