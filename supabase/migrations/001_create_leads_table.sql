-- Create leads table for WhatsApp contact form submissions
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  source TEXT DEFAULT 'whatsapp_float',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for non-logged-in users)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to read their own leads
CREATE POLICY "Users can read own leads" ON leads
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow authenticated users to update their own leads
CREATE POLICY "Users can update own leads" ON leads
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_user_id ON leads(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
