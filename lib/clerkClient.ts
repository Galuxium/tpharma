/**
 * Clerk client helper library for pharmacy website authentication
 * 
 * This module provides utilities for initializing and managing Clerk authentication flows
 * in a pharmacy website built with Next.js 15 and Supabase.
 */
import { clerk, Session } from '@clerk/nextjs';

export interface ClerkConfig {
  publicKey: string;
  sessionApiKey: string;
  redirectUri: string;
}

/**
 * Initialize Clerk SDK with required configuration
 * 
 * @param config - Clerk configuration object containing required environment variables
 */
export function initializeClerk(config: ClerkConfig): void {
  clerk.init({
    publicKey: config.publicKey,
    sessionApiKey: config.sessionApiKey,
    redirectUri: config.redirectUri,
  });
}

/**
 * Trigger Clerk sign-in flow
 * 
 * @returns Promise that resolves when user is signed in
 */
export async function signInWithClerk(): Promise<void> {
  await clerk.signIn();
}

/**
 * Handle Clerk sign-in redirect callback
 * 
 * @param session - Clerk session data after sign-in
 */
export function handleSignInRedirect(session: Session): void {
  // Implement session handling logic here (e.g., save session to Supabase)
  console.log('Clerk session received:', session);
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): clerk.User | null {
  return clerk.getCurrentUser();
}

/**
 * Log out user from Clerk and clear session
 */
export async function logout(): Promise<void> {
  await clerk.logout();
}

/**
 * Verify if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getCurrentUser();
}

// =======================
// Environment Variables ==
// =======================
/**
 * Required environment variables for Clerk integration
 */
// 
// CLERK_PUBLIC_KEY: Clerk application public key
// CLERK_SESSION_API_KEY: Clerk session API key for client-side sessions
// CLERK_REDIRECT_URI: URL to redirect users after authentication
// 
// These must be set in .env file or Vercel environment variables
// 
// Example:
// CLERK_PUBLIC_KEY=pk_test_abc123
// CLERK_SESSION_API_KEY=sk_test_abc123
// CLERK_REDIRECT_URI=https://your-pharmacy.com/auth/callback