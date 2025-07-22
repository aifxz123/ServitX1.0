/*
  # Ensure Admin User Exists and Fix Admin Access

  1. Insert admin user record if it doesn't exist
  2. Update RLS policies to work with email-based admin identification
  3. Ensure admin can access all service records
*/

-- First, let's create a function to check if user is admin by email
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT auth.email() = 'admin@servitex.com';
$$;

-- Drop existing admin policies
DROP POLICY IF EXISTS "Admin users can read all service records" ON service_records;
DROP POLICY IF EXISTS "Admin users can read all garage data" ON garages;

-- Create new admin policies that work with email check
CREATE POLICY "Admin can read all service records"
  ON service_records
  FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admin can read all garage data"
  ON garages
  FOR SELECT
  TO authenticated
  USING (is_admin_user());

CREATE POLICY "Admin can manage all service records"
  ON service_records
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- Ensure admin user exists in admin_users table
INSERT INTO admin_users (id, email, created_at)
SELECT 
  auth.uid(),
  'admin@servitex.com',
  now()
WHERE auth.email() = 'admin@servitex.com'
ON CONFLICT (email) DO NOTHING;

-- Also ensure we can insert admin user manually if needed
INSERT INTO admin_users (id, email, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@servitex.com',
  now()
) ON CONFLICT (email) DO NOTHING;