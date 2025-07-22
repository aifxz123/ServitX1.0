/*
  # Add mileage and technician fields to service records

  1. Changes
    - Add `mileage` column to service_records table (integer, optional)
    - Add `technician_name` column to service_records table (text, optional)
  
  2. Notes
    - These fields support the enhanced service record submission flow
    - Mileage helps track vehicle maintenance intervals
    - Technician name provides accountability and traceability
*/

DO $$
BEGIN
  -- Add mileage column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'service_records' AND column_name = 'mileage'
  ) THEN
    ALTER TABLE service_records ADD COLUMN mileage integer;
  END IF;

  -- Add technician_name column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'service_records' AND column_name = 'technician_name'
  ) THEN
    ALTER TABLE service_records ADD COLUMN technician_name text;
  END IF;
END $$;