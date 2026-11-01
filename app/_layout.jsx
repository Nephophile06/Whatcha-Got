import '../global.css';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useAuthStore } from '../src/store/authStore';
import { ASSETS } from '../src/constants/assets';
import { colors } from '../src/theme/tokens';

// Prevent auto-hiding the splash screen until resources are loaded
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const checkSession = useAuthStore((state) => state.checkSession);
  const [fontsLoaded, fontError] = useFonts(ASSETS.fonts);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    let active = true;
    checkSession().finally(() => {
      if (active) setSessionChecked(true);
    });
    return () => {
      active = false;
    };
  }, [checkSession]);

  useEffect(() => {
    if ((fontsLoaded || fontError) && sessionChecked) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError, sessionChecked]);

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
