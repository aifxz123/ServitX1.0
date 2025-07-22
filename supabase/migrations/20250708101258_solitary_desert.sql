/*
  # Create admin user for demo

  1. New Records
    - Add admin user with ID that matches auth user
    
  2. Purpose
    - Creates admin@servitex.com user in admin_users table
    - Allows admin login to work properly
*/

-- Insert admin user with specific ID for demo
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