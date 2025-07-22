/*
  # Fix garage signup RLS policy

  1. Security Updates
    - Add INSERT policy for garages table to allow new user signups
    - Allow authenticated users to insert their own garage record
    - Ensure the user can only insert a record with their own user ID

  2. Policy Details
    - Policy name: "Users can create own garage record"
    - Operation: INSERT
    - Target: authenticated users
    - Condition: auth.uid() = id (user can only insert record with their own ID)
*/

-- Create INSERT policy for garages table to allow new signups
CREATE POLICY "Users can create own garage record"
  ON garages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);