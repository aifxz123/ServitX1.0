/*
  # Servitex Database Schema

  1. New Tables
    - `garages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `address` (text)
      - `subscription_status` (text, default 'inactive')
      - `subscription_id` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `service_records`
      - `id` (uuid, primary key)
      - `garage_id` (uuid, foreign key)
      - `vehicle_registration` (text)
      - `service_date` (date)
      - `service_type` (text)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for public vehicle lookup access
    - Add policies for admin access
*/

-- Create garages table
CREATE TABLE IF NOT EXISTS garages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  address text,
  subscription_status text DEFAULT 'inactive',
  subscription_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create service_records table
CREATE TABLE IF NOT EXISTS service_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  garage_id uuid NOT NULL REFERENCES garages(id) ON DELETE CASCADE,
  vehicle_registration text NOT NULL,
  service_date date NOT NULL,
  service_type text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE garages ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for garages
CREATE POLICY "Garages can read own data"
  ON garages
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Garages can update own data"
  ON garages
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for service records
CREATE POLICY "Garages can read own service records"
  ON service_records
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = garage_id::text);

CREATE POLICY "Garages can create service records"
  ON service_records
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = garage_id::text);

CREATE POLICY "Garages can update own service records"
  ON service_records
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = garage_id::text);

CREATE POLICY "Garages can delete own service records"
  ON service_records
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = garage_id::text);

-- Create policy for public vehicle lookup
CREATE POLICY "Public can read service records for lookup"
  ON service_records
  FOR SELECT
  TO anon
  USING (true);

-- Create policies for admin users
CREATE POLICY "Admin users can read all data"
  ON garages
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "Admin users can read all service records"
  ON service_records
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.email = auth.jwt() ->> 'email'
  ));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_records_vehicle_registration ON service_records(vehicle_registration);
CREATE INDEX IF NOT EXISTS idx_service_records_garage_id ON service_records(garage_id);
CREATE INDEX IF NOT EXISTS idx_service_records_service_date ON service_records(service_date);

-- Insert sample admin user
INSERT INTO admin_users (email) VALUES ('admin@servitex.com') ON CONFLICT DO NOTHING;

-- Insert sample garage data for testing
INSERT INTO garages (name, email, phone, address, subscription_status) VALUES 
  ('Premium Auto Services', 'contact@premiumauto.com', '01234567890', '123 High Street, London, SW1A 1AA', 'active'),
  ('City Garage', 'info@citygarage.com', '01234567891', '456 Main Road, Manchester, M1 1AB', 'active'),
  ('Quick Fix Motors', 'hello@quickfix.com', '01234567892', '789 Park Lane, Birmingham, B1 1CD', 'inactive')
ON CONFLICT DO NOTHING;

-- Insert sample service records
INSERT INTO service_records (garage_id, vehicle_registration, service_date, service_type, notes) VALUES 
  ((SELECT id FROM garages WHERE email = 'contact@premiumauto.com'), 'AB12CDE', '2024-01-15', 'Full Service', 'Complete inspection and maintenance. All fluids changed, filters replaced.'),
  ((SELECT id FROM garages WHERE email = 'contact@premiumauto.com'), 'FG34HIJ', '2024-01-20', 'Oil Change', 'Engine oil and filter change. Next service due in 6 months.'),
  ((SELECT id FROM garages WHERE email = 'info@citygarage.com'), 'KL56MNO', '2024-01-25', 'Brake Replacement', 'Front brake pads and discs replaced. Brake fluid topped up.'),
  ((SELECT id FROM garages WHERE email = 'info@citygarage.com'), 'AB12CDE', '2024-02-01', 'MOT Prep', 'Pre-MOT inspection completed. Minor adjustments made.')
ON CONFLICT DO NOTHING;