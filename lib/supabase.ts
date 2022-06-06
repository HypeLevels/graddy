import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gwbnxmsssjmngeseavwg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Ym54bXNzc2ptbmdlc2VhdndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ0NTY2NjksImV4cCI6MTk3MDAzMjY2OX0.9tPqF1R0BizF2q5LWmbPiMX4cV9s7lKY7WTNBK83zvc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});