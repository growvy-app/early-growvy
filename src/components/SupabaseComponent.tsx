import { useEffect } from 'react';
import { getSupabase } from '../lib/supabase';

export default function SupabaseComponent() {
  useEffect(() => {
    try {
      const supabase = getSupabase();
      if (supabase) {
        console.log('Supabase client initialized successfully');
      } else {
        console.warn('Supabase client is null. Check your environment variables.');
      }
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
    }
  }, []);

  return null;
}
