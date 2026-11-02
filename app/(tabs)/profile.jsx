import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, AppText, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { colors, shadows } from '../../src/theme/tokens';

function InfoRow({ icon, label, onPress, last = false }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="min-h-[56px] flex-row items-center px-md py-sm"
      style={!last ? { borderBottomWidth: 1, borderBottomColor: colors.border } : null}
    >
      <Image
        source={icon}
        contentFit="contain"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ width: 24, height: 24, tintColor: colors.textPrimary }}
      />
      <AppText variant="body" fontSize={17} className="ml-md flex-1">
        {label}
      </AppText>
      <Image
        source={ASSETS.icons.chevronForward}
        contentFit="contain"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ width: 16, height: 16, tintColor: colors.textPrimary }}
      />
    </Pressable>
  );
}

function SectionCard({ children }) {
  return (
    <View
      className="rounded-lg"
      style={[{ borderWidth: 1, borderColor: 'transparent' }, shadows.sm]}
    >
      <LinearGradient
        colors={[colors.surface, colors.mint]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ borderRadius: 16 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [toast, setToast] = useState(null);

  const username = user?.username || 'Nondiní';
  const phone = user?.phone || '01xxxxxxxxx';

  const showComingSoon = () => setToast({ type: 'info', message: 'Coming soon' });

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/welcome');
  };

  return (
    <View className="flex-1">
      <Screen
        variant="cream"
        scroll
        padded={false}
        contentContainerClassName="pb-xl"
        statusBarStyle="dark-content"
      >
        <View className="px-md pt-sm">
          <Pressable
            onPress={() => router.push('/home-dashboard')}
            accessibilityRole="button"
            accessibilityLabel="Back to home"
            className="h-11 w-11 items-start justify-center"
          >
            <Image
              source={ASSETS.icons.undoBack}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{ width: 32, height: 32 }}
            />
          </Pressable>

          <View className="mt-md flex-row items-center px-sm">
            <View className="h-[72px] w-[72px] items-center justify-center rounded-full bg-surface">
              <Image
                source={ASSETS.icons.customerProfile}
                contentFit="contain"
                accessibilityLabel="Profile avatar"
                style={{ width: 34, height: 34 }}
              />
            </View>
            <View className="ml-lg flex-1">
              <AppText variant="display" fontSize={28}>
                {username}
              </AppText>
              <AppText variant="body" fontSize={16} className="mt-xs text-text-primary">
                {phone}
              </AppText>
            </View>
          </View>

          <AppText variant="body" fontSize={17} className="mb-sm mt-lg px-sm">
            Personal Information
          </AppText>
          <SectionCard>
            <InfoRow
              icon={ASSETS.icons.editPencil}
              label="Change Account Info"
              onPress={() => router.push('/account-settings')}
            />
            <InfoRow icon={ASSETS.icons.forwardArrow} label="Share Recipe" onPress={showComingSoon} />
            <InfoRow
              icon={ASSETS.icons.targetGoal}
              label="Target Calorie"
              onPress={showComingSoon}
              last
            />
          </SectionCard>

          <AppText variant="body" fontSize={17} className="mb-sm mt-xl px-sm">
            Account Settings
          </AppText>
          <SectionCard>
            <InfoRow
              icon={ASSETS.icons.settingsSlider}
              label="Food Preferences"
              onPress={showComingSoon}
            />
            <InfoRow icon={ASSETS.icons.nightMode} label="Theme" onPress={showComingSoon} />
            <InfoRow icon={ASSETS.icons.language} label="App Language" onPress={showComingSoon} />
            <InfoRow
              icon={ASSETS.icons.termsAndConditions}
              label="Terms and Conditions"
              onPress={showComingSoon}
            />
            <InfoRow
              icon={ASSETS.icons.logout}
              label="Log Out / Sign Out"
              onPress={handleLogout}
              last
            />
          </SectionCard>
        </View>
      </Screen>

      {toast ? (
        <View className="absolute left-md right-md top-xxl">
          <Toast type={toast.type} message={toast.message} onDismiss={() => setToast(null)} />
        </View>
      ) : null}
    </View>
  );
}
