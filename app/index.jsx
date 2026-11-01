import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { colors } from '../src/theme/tokens';

export default function Index() {
  const router = useRouter();
  const { user, isLoading, hasCompletedOnboarding } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (!hasCompletedOnboarding) {
      router.replace('/(auth)/onboarding');
    } else if (user) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/(auth)/welcome');
    }
  }, [isLoading, user, hasCompletedOnboarding, router]);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

