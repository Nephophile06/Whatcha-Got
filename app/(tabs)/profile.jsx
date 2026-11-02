import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Stage, AppText, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { colors, shadows } from '../../src/theme/tokens';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/profile';

function InfoRow({ icon, label, onPress, last = false, height }) {
  const { s } = useStage();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-row items-center py-sm"
      style={[
        { minHeight: s(height), paddingHorizontal: s(36) },
        !last ? { borderBottomWidth: 1, borderBottomColor: colors.border } : null,
      ]}
    >
      <Image
        source={icon}
        contentFit="contain"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ width: s(24), height: s(24), tintColor: colors.textPrimary }}
      />
      <AppText variant="body" fontSize={17} className="flex-1" style={{ marginLeft: s(26) }}>
        {label}
      </AppText>
      <Image
        source={ASSETS.icons.chevronForward}
        contentFit="contain"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ width: s(16), height: s(16), tintColor: colors.textPrimary }}
      />
    </Pressable>
  );
}

function SectionCard({ children, radius }) {
  const { s } = useStage();

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
        style={{ borderRadius: s(radius) }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

/**
 * Profile — bands from design/screens/profile.png (back 70, avatar 133,
 * personal info 236, card 267, account settings 470, card 503). The frame
 * includes the tab bar, which the navigator renders separately, so the stage
 * stops at the tab-bar top (803).
 */
export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { W, fx, fy, s } = useStage();
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
        padded={false}
        edges={[]}
        statusBarStyle="dark-content"
      >
        <Stage minHeight={fy(L.tabBarTop)}>
          <View style={{ width: W, minHeight: fy(L.tabBarTop) }}>
            <Pressable
              onPress={() => router.push('/home-dashboard')}
              accessibilityRole="button"
              accessibilityLabel="Back to home"
              className="items-center justify-center"
              style={{
                marginTop: fy(L.back.y),
                marginLeft: fx(L.back.x),
                width: s(L.back.w),
                height: s(L.back.h),
              }}
            >
              <Image
                source={ASSETS.icons.undoBack}
                contentFit="contain"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={{ width: s(32), height: s(32) }}
              />
            </Pressable>

            <View
              className="flex-row items-center"
              style={{
                marginTop: fy(L.avatar.y - (L.back.y + L.back.h)),
                marginLeft: fx(L.avatar.x),
                marginRight: fx(45),
              }}
            >
              <View
                className="items-center justify-center rounded-full bg-surface"
                style={{ width: s(L.avatar.w), height: s(L.avatar.h) }}
              >
                <Image
                  source={ASSETS.icons.customerProfile}
                  contentFit="contain"
                  accessibilityLabel="Profile avatar"
                  style={{ width: s(34), height: s(34) }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: fx(L.name.x - (L.avatar.x + L.avatar.w)) }}>
                <AppText
                  variant="display"
                  fontSize={L.name.size}
                  numberOfLines={L.name.lines}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                >
                  {username}
                </AppText>
                <AppText
                  variant="body"
                  fontSize={L.phone.size}
                  className="text-text-primary"
                  style={{ marginTop: fy(L.phone.y - (L.name.y + L.name.h)) }}
                >
                  {phone}
                </AppText>
              </View>
            </View>

            <AppText
              variant="body"
              fontSize={L.sectionInfo.size}
              style={{
                marginTop: fy(L.sectionInfo.y - (L.avatar.y + L.avatar.h)),
                marginLeft: fx(L.sectionInfo.x),
              }}
            >
              Personal Information
            </AppText>

            <View style={{ marginTop: fy(L.card1.y - (L.sectionInfo.y + L.sectionInfo.h)) }}>
              <View style={{ marginLeft: fx(L.card1.x), width: fx(L.card1.w) }}>
                <SectionCard radius={L.card1.radius}>
                  <InfoRow
                    icon={ASSETS.icons.editPencil}
                    label="Change Account Info"
                    onPress={() => router.push('/account-settings')}
                    height={L.rowH}
                  />
                  <InfoRow
                    icon={ASSETS.icons.forwardArrow}
                    label="Share Recipe"
                    onPress={showComingSoon}
                    height={L.rowH}
                  />
                  <InfoRow
                    icon={ASSETS.icons.targetGoal}
                    label="Target Calorie"
                    onPress={showComingSoon}
                    last
                    height={L.rowH}
                  />
                </SectionCard>
              </View>
            </View>

            <AppText
              variant="body"
              fontSize={L.sectionSettings.size}
              style={{
                marginTop: fy(L.sectionSettings.y - (L.card1.y + L.card1.h)),
                marginLeft: fx(L.sectionSettings.x),
              }}
            >
              Account Settings
            </AppText>

            <View
              style={{ marginTop: fy(L.card2.y - (L.sectionSettings.y + L.sectionSettings.h)) }}
            >
              <View style={{ marginLeft: fx(L.card2.x), width: fx(L.card2.w) }}>
                <SectionCard radius={L.card2.radius}>
                  <InfoRow
                    icon={ASSETS.icons.settingsSlider}
                    label="Food Preferences"
                    onPress={showComingSoon}
                    height={55}
                  />
                  <InfoRow
                    icon={ASSETS.icons.nightMode}
                    label="Theme"
                    onPress={showComingSoon}
                    height={55}
                  />
                  <InfoRow
                    icon={ASSETS.icons.language}
                    label="App Language"
                    onPress={showComingSoon}
                    height={55}
                  />
                  <InfoRow
                    icon={ASSETS.icons.termsAndConditions}
                    label="Terms and Conditions"
                    onPress={showComingSoon}
                    height={55}
                  />
                  <InfoRow
                    icon={ASSETS.icons.logout}
                    label="Log Out / Sign Out"
                    onPress={handleLogout}
                    last
                    height={55}
                  />
                </SectionCard>
              </View>
            </View>

            <View style={{ flexGrow: 1, minHeight: s(8) }} />
          </View>
        </Stage>
      </Screen>

      {toast ? (
        <View className="absolute left-md right-md top-xxl">
          <Toast type={toast.type} message={toast.message} onDismiss={() => setToast(null)} />
        </View>
      ) : null}
    </View>
  );
}
