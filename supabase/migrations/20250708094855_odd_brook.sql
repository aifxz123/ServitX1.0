/*
  # Fix user profiles for demo accounts

  1. Updates
    - Update existing garage profile for contact@premiumauto.com to use correct auth ID
    - Ensure admin user exists with correct auth ID
    - Add sample service records for demo

  2. Security
    - Maintains existing RLS policies
    - Preserves data integrity
*/

-- First, update the existing garage record to use the correct auth user ID
UPDATE garages 
SET 
  id = '4e616bfa-93d0-436d-a76b-21f85f61a312'::uuid,
  name = 'Premium Auto Service',
  phone = '+1 (555) 123-4567',
  address = '123 Main Street, Automotive District, City, State 12345',
  subscription_status = 'active',
  updated_at = now()
WHERE email = 'contact@premiumauto.com';

-- If no garage was updated (doesn't exist), insert it
INSERT INTO garages (
  id,
  name,
  email,
  phone,
  address,
  subscription_status,
  created_at,
  updated_at
)
SELECT 
  '4e616bfa-93d0-436d-a76b-21f85f61a312'::uuid,
  'Premium Auto Service',
  'contact@premiumauto.com',
  '+1 (555) 123-4567',
  '123 Main Street, Automotive District, City, State 12345',
  'active',
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM garages WHERE email = 'contact@premiumauto.com'
);

-- Ensure admin user exists
INSERT INTO admin_users (
  id,
  email,
  created_at
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  'admin@servitex.com',
  now()
) ON CONFLICT (email) DO UPDATE SET
  id = EXCLUDED.id;

-- Update any existing service records to use the correct garage_id
UPDATE service_records 
SET garage_id = '4e616bfa-93d0-436d-a76b-21f85f61a312'::uuid
WHERE garage_id IN (
  SELECT id FROM garages WHERE email = 'contact@premiumauto.com'
);

-- Add sample service records for the garage (only if they don't exist)
INSERT INTO service_records (
  garage_id,
  vehicle_registration,
  service_date,
  service_type,
  notes
)
SELECT 
  '4e616bfa-93d0-436d-a76b-21f85f61a312'::uuid,
  reg,
  date,
  type,
  note
FROM (VALUES 
  ('AB12CDE', '2024-01-15'::date, 'Full Service', 'Complete inspection and maintenance. All fluids changed, filters replaced.'),
  ('FG34HIJ', '2024-01-20'::date, 'Oil Change', 'Engine oil and filter change. Next service due in 6 months.'),
  ('KL56MNO', '2024-01-25'::date, 'Brake Replacement', 'Front brake pads and discs replaced. Brake fluid topped up.')
) AS sample_data(reg, date, type, note)
WHERE NOT EXISTS (
  SELECT 1 FROM service_records 
  WHERE garage_id = '4e616bfa-93d0-436d-a76b-21f85f61a312'::uuid 
  AND vehicle_registration = sample_data.reg
);