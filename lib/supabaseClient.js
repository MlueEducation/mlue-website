import { createClient } from '@supabase/supabase-js';

// These are the public (safe-for-browser) project URL + anon key.
export const supabase = createClient(
  'https://pzijsxlvnosqvouxpvyv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6aWpzeGx2bm9zcXZvdXhwdnl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzQ2MzksImV4cCI6MjA5OTcxMDYzOX0.-SLGYmINEAXjnxE6ihdr72IHzhtvpBMqYZTkMZc7-UU'
);
