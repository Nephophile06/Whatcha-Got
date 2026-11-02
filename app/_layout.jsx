import '../global.css';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useAuthStore } from '../src/store/authStore';
import { ASSETS } from '../src/constants/assets';
import { colors } from '../src/theme/tokens';
import { StageProvider } from '../src/lib/stage';

// Dev-only Figma comparison overlay. Not mounted unless explicitly enabled.
let DesignOverlay = null;
if (process.env.EXPO_PUBLIC_DESIGN_OVERLAY === '1') {
  DesignOverlay = require('../src/dev/DesignOverlay').default;
}

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
    <StageProvider>
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
        <Stack.Screen name="home-loading" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="home-dashboard" options={{ headerShown: false }} />
        <Stack.Screen
          name="share-recipe"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="target-calorie"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      {DesignOverlay ? <DesignOverlay /> : null}
    </StageProvider>
  );
}
