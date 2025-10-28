// lib/nextAuthHelper.ts
import NextAuth from 'next-auth'
import ClerkProvider from '@clerk/nextjs'
import SupabaseProvider from '@supabase/next-auth'

// Type definitions for user data
type ClerkUser = {
  id: string
  email: string
  roles?: string[]
}

type SupabaseUser = {
  id: string
  email: string
  meta: {
    roles?: string[]
  }
}

type AuthUser = ClerkUser | SupabaseUser

// NextAuth configuration
const authConfig = {
  providers: [
    // Clerk Provider (patient or clerk login)
    ClerkProvider({
      id: process.env.CLERK_ID as string,
      secret: process.env.CLERK_SECRET as string,
      // Scopes for patient-specific data access
      scope: 'read:health_records,write:prescriptions',
    }),

    // Supabase Provider (for Supabase SSO or database integration)
    SupabaseProvider({
      url: process.env.SUPABASE_URL as string,
      key: process.env.SUPABASE_KEY as string,
      // Optional: Add Supabase row-level security policies
      roleMapping: (user, token, claim, idToken) => {
        return user?.meta?.roles || ['patient']
      }
    })
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // Unified sign-in logic for both providers
      const mergedUser: AuthUser = {
        id: user?.id || account?.user?.id,
        email: user?.email || account?.user?.email,
        // Merge roles from both providers
        roles: [
          ...(user?.roles || []),
          ...(user?.meta?.roles || []),
        ].filter(Boolean),
      }
      
      return { user: mergedUser }
    },

    async jwt({ token, user }) {
      // Add custom claims for clinic-specific data
      token.clinicId = process.env.CLINIC_ID as string
      token.userRoles = user?.roles || []
      return token
    },

    async session({ session, user }) {
      // Add required session data for patient/clerk roles
      session.user = {
        ...session.user,
        isClinicStaff: user?.roles?.includes('clerk'),
      }
      return session
    },

    async sessionLoad({ session, token }) {
      // Load user data from token
      if (token && token.clinicId) {
        session.user = { ...session.user, clinicId: token.clinicId }
      }
      return session
    }
  },

  // Security settings
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async error({ error, redirect }) {
      // Custom error handling
      if (error.message.includes('invalid_grant')) {
        return redirect('/login?error=invalid_credentials')
      }
      return redirect('/login')
    }
  }
}

export default NextAuth(authConfig)