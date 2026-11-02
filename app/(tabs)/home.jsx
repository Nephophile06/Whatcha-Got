import React from 'react';
import { Redirect } from 'expo-router';

/**
 * The Home Dashboard has no bottom tab bar in the design, so the dashboard
 * lives at /home-dashboard (outside this group). The Home tab redirects there
 * so existing tab navigation keeps working.
 */
export default function HomeTab() {
  return <Redirect href="/home-dashboard" />;
}
