/*
  # Add garage signup fields

  1. New Columns
    - Add `companies_house_number` to garages table for business verification
    - Add `full_name` to garages table for contact person
    - Add `stripe_customer_id` for payment integration
    - Add `verification_status` to track approval process

  2. Security
    - Maintain existing RLS policies
    - Add policies for pending garage accounts
*/

-- Add new columns to garages table
DO $$
BEGIN
  -- Add companies_house_number column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'garages' AND column_name = 'companies_house_number'
  ) THEN
    ALTER TABLE garages ADD COLUMN companies_house_number text;
  END IF;

  -- Add full_name column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'garages' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE garages ADD COLUMN full_name text;
  END IF;

  -- Add stripe_customer_id column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'garages' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE garages ADD COLUMN stripe_customer_id text;
  END IF;

  -- Add verification_status column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'garages' AND column_name = 'verification_status'
  ) THEN
    ALTER TABLE garages ADD COLUMN verification_status text DEFAULT 'pending';
  END IF;
END $$;

-- Update subscription_status to include 'pending' option
DO $$
BEGIN
  -- Update existing records to have proper verification status
  UPDATE garages 
  SET verification_status = 'approved' 
  WHERE verification_status IS NULL AND subscription_status = 'active';
  
  UPDATE garages 
  SET verification_status = 'pending' 
  WHERE verification_status IS NULL;
END $$;

-- Add RLS policy for pending garage accounts
CREATE POLICY "Pending garages can read own data"
  ON garages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id AND verification_status = 'pending');

-- Add RLS policy for admin to manage pending accounts
CREATE POLICY "Admin can manage pending garages"
  ON garages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );