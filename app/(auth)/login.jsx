import React from 'react';
import { Text } from 'react-native';
import { Screen } from '../../src/components/ui';

/**
 * Placeholder for the Login screen (arrives in a later phase).
 * Phase 2A only needs the route and its title.
 */
export default function LoginScreen() {
  return (
    <Screen padded={false} contentContainerClassName="items-center justify-center">
      <Text className="font-display text-display text-text-primary">Login</Text>
    </Screen>
  );
}
