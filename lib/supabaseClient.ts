// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Environment variables (should be in .env file)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY) as SupabaseClient;

// Auth helpers
export const auth = {
  // Initialize client-side auth
  initClientAuth: () => supabase.auth,

  // Server-side auth checks
  checkAuthentication: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      return data || null; // Returns user object or null
    } catch (error) {
      console.error('Auth error:', error);
      return null;
    }
  },

  // Example sign-in flow
  signInWithEmail: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return data?.user;
    } catch (error) {
      throw new Error(`Auth error: ${error.message}`);
    }
  },

  // Example sign-out
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      return false;
    }
  },
};

// Database helpers with RLS considerations
export const db = {
  // Generic query helper
  query: async <T>(table: string, query: string, params?: any) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', 'eq', 'any');
    if (error) throw error;
    return data as T[];
  },

  // Example prescription table access with RLS
  getPrescriptionsForPatient: async (patientId: string) => {
    // Supabase handles RLS policies server-side, but we can add client-side checks
    const { data, error } = await supabase.from('prescriptions')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as any[];
  },

  // Example clerk-specific access
  getClinicsForClerk: async (clerkId: string) => {
    // Apply RLS policy: clerk can only see clinics they manage
    const { data, error } = await supabase.from('clinics')
      .select('*')
      .eq('clerks', 'contains', clerkId)
      .order('name');

    if (error) throw error;
    return data as any[];
  }
};

// RLS Policy Helper (supabase handles server-side enforcement)
export const rls = {
  // Define policy key for custom policies
  setPolicyKey: async (tableName: string, policyKey: string) => {
    const { error } = await supabase.storage.storage.policies.setPolicyKey(
      tableName,
      policyKey
    );
    if (error) throw error;
  },

  // Example usage in policy definition (Supabase Dashboard)
  // In Supabase dashboard, create policy for 'prescriptions' table:
  // {
  //   "row_level_security": {
  //     "rules": [
  //       {
  //         "schema": "public",
  //         "table": "prescriptions",
  //         "row_select": {
  //           "rule": "row_access_by_user",
  //           "parameters": {
  //             "userColumn": "prescriber_id",
  //             "userRoleColumn": "role"
  //           }
  //         }
  //       }
  //     ]
  //   }
  // }
};

// Example Server-Side Rendering setup
export const ssrClient = async () => {
  // On server-side, use ServiceRole for database access
  const supabaseSsr = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  return supabaseSsr;
};

// Usage Examples in Clinic Component
export const exampleUsage = {
  // In Clerk Dashboard Page
  getClinics: async () => {
    const clerkId = supabase.auth.getUser()?.user?.id; // Should be in server component context
    return db.getClinicsForClerk(clerkId!);
  },

  // In Patient Profile Page
  getPrescriptions: async () => {
    const patientId = supabase.auth.getUser()?.user?.id;
    return db.getPrescriptionsForPatient(patientId!);
  },
};