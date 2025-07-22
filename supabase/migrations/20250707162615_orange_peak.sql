/*
  # Add Demo Users

  1. New Data
    - Add demo garage user: contact@premiumauto.com
    - Add demo admin user: admin@servitex.com
  
  2. Details
    - Garage user will have active subscription status
    - Admin user will be added to admin_users table
    - Both users correspond to the demo credentials shown on login page

  3. Security
    - No changes to existing RLS policies
    - Users will be able to access their respective dashboards after login
*/

-- Add demo garage user
INSERT INTO garages (
  email,
  name,
  phone,
  address,
  subscription_status
) VALUES (
  'contact@premiumauto.com',
  'Premium Auto Service',
  '+1 (555) 123-4567',
  '123 Main Street, Anytown, ST 12345',
  'active'
) ON CONFLICT (email) DO NOTHING;

-- Add demo admin user
INSERT INTO admin_users (
  email
) VALUES (
  'admin@servitex.com'
) ON CONFLICT (email) DO NOTHING;