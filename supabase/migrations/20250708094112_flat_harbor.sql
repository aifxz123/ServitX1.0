/*
  # Create missing garage profile for authenticated user

  1. New Records
    - Add garage profile for contact@premiumauto.com with ID 4e616bfa-93d0-436d-a76b-21f85f61a312
    
  2. Details
    - This resolves the authentication error where user exists in auth but not in garages table
    - Sets up demo garage account with appropriate subscription status
*/

INSERT INTO garages (
  id,
  name,
  email,
  phone,
  address,
  subscription_status,
  created_at,
  updated_at
) VALUES (
  '4e616bfa-93d0-436d-a76b-21f85f61a312',
  'Premium Auto Service',
  'contact@premiumauto.com',
  '+1 (555) 123-4567',
  '123 Main Street, Automotive District, City, State 12345',
  'active',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;