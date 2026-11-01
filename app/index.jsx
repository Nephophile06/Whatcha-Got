import React from 'react';
import { Redirect } from 'expo-router';

/**
 * Phase 2A entry point: the auth flow always starts at onboarding.
 * The session-aware redirect returns when Supabase auth is wired in Phase 5.
 */
export default function Index() {
  return <Redirect href="/(auth)/onboarding" />;
}
