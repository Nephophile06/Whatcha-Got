import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../src/store/authStore';
import { colors } from '../src/theme/tokens';

export default function RootLayout() {
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="account-settings"
          options={{
            headerShown: true,
            title: 'Account Settings',
            headerTintColor: colors.textPrimary,
            headerStyle: { backgroundColor: colors.surface },
          }}
        />
        <Stack.Screen
          name="share-recipe"
          options={{
            headerShown: true,
            title: 'Share Recipe',
            headerTintColor: colors.textPrimary,
            headerStyle: { backgroundColor: colors.surface },
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="target-calorie"
          options={{
            headerShown: true,
            title: 'Calorie Target',
            headerTintColor: colors.textPrimary,
            headerStyle: { backgroundColor: colors.surface },
          }}
        />
      </Stack>
    </>
  );
}

