/**
 * DesignOverlay — dev-only Figma comparison layer.
 *
 * Enabled by EXPO_PUBLIC_DESIGN_OVERLAY=1. A floating pill toggles a 40%
 * opacity copy of the matching design PNG stretched over the running screen.
 * It is never mounted when the flag is unset, so production builds are clean.
 */
import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { usePathname, useGlobalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/ui/AppText';
import { useStage } from '../lib/stage';
import { colors } from '../theme/tokens';
import { getDesignFrame } from './designFrames';

export default function DesignOverlay() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const { W, H, offsetX } = useStage();
  const [visible, setVisible] = useState(false);
  const frame = getDesignFrame(pathname, params.state);

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      {visible && frame ? (
        <Image
          source={frame}
          contentFit="fill"
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: offsetX,
            top: 0,
            width: W,
            height: H,
            opacity: 0.4,
          }}
        />
      ) : null}

      <Pressable
        onPress={() => setVisible((current) => !current)}
        accessibilityRole="button"
        accessibilityLabel={visible ? 'Hide design overlay' : 'Show design overlay'}
        style={{
          position: 'absolute',
          right: 12,
          bottom: insets.bottom + 92,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 999,
          backgroundColor: visible ? colors.primary : colors.surface,
          borderWidth: 1,
          borderColor: colors.primary,
        }}
      >
        <AppText variant="caption" className={visible ? 'text-text-inverse' : 'text-primary'}>
          {visible ? 'Hide design' : 'Design'}
        </AppText>
      </Pressable>
    </View>
  );
}
