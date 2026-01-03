-- Migration: Add deleted_at column to qr_codes table
-- Run this SQL in your Supabase SQL Editor if you get errors about missing 'deleted_at' column

ALTER TABLE qr_codes ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_qr_codes_deleted_at ON qr_codes(deleted_at) WHERE deleted_at IS NULL;

-- Update trigger to handle deleted_at in updated_at trigger (if needed)
-- The existing trigger should work fine, but we ensure it's set up correctly

