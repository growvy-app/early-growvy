import { useEffect } from 'react';
import { getSupabase } from '../lib/supabase';

export default function SupabaseComponent() {
  useEffect(() => {
    // Initialize Supabase client here if needed
    try {
      getSupabase();
      console.log('Supabase client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
    }
  }, []);

  return null;
}
