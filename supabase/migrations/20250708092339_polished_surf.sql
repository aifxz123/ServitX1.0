/*
  # Add missing admin user

  1. New Records
    - Add `admin@servitex.com` to `admin_users` table
  
  2. Purpose
    - Fixes authentication issue where admin user exists in Supabase Auth but not in admin_users table
    - Allows admin@servitex.com to successfully log in and be recognized as an admin user
  
  3. Notes
    - This resolves the PGRST116 error occurring during login
    - User will be able to access admin dashboard after this migration
*/

INSERT INTO admin_users (email) 
VALUES ('admin@servitex.com')
ON CONFLICT (email) DO NOTHING;