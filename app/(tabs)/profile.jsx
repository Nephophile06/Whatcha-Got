import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Stage, AppText, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { colors, shadows } from '../../src/theme/tokens';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/profile';

/**
 * InfoRow — one settings row. Heights come from the layout because the Figma
 * rows are not uniform (54/52/56 and 59/52/52/54/59); the rule is a 10% black
 * line inset 21 px from the card edges, not a full-width border.
 */
function InfoRow({ icon, label, onPress, last = false, height }) {
  const { s, fy } = useStage();
  const { row } = L;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-row items-center"
      style={{
        // Row heights belong to the vertical layout, so they follow fy: on a
        // short phone the cards keep ending above the tab bar instead of
        // overflowing the fixed stage column.
        minHeight: fy(height),
        paddingLeft: s(row.padLeft),
        paddingRight: s(row.padRight),
      }}
    >
      <Image
        source={icon}
        contentFit="contain"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ width: s(row.icon), height: s(row.icon), tintColor: colors.textPrimary }}
      />
      <AppText
        variant="body"
        fontSize={row.labelSize}
        numberOfLines={1}
        style={{ flex: 1, marginLeft: s(row.gap) }}
      >
        {label}
      </AppText>
      <Ionicons
        name="chevron-forward"
        size={s(17)}
        color={colors.textPrimary}
        style={{ transform: [{ translateY: s(-1) }] }}
        accessible={false}
      />
      {!last ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: s(row.separatorInset),
            right: s(row.separatorInset),
            bottom: 0,
            height: 1,
            backgroundColor: colors.cardSeparator,
          }}
        />
      ) : null}
    </Pressable>
  );
}

/**
 * SectionCard — white/mint gradient card. The first card fades white -> mint
 * top to bottom; the second card is flipped (mint -> white), matching the PNG.
 */
function SectionCard({ children, radius, flip = false, padTop = 0, padBottom = 0 }) {
  const { s } = useStage();

  // The Figma cards have a faint white halo rather than a dark drop shadow, so
  // no elevation is drawn here (a dark shadow read as a 1 px outline in the diff).
  return (
    <LinearGradient
      colors={flip ? [colors.mint, colors.surface] : [colors.surface, colors.mint]}
      locations={[0, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        borderRadius: s(radius),
        overflow: 'hidden',
        paddingTop: s(padTop),
        paddingBottom: s(padBottom),
      }}
    >
      {children}
    </LinearGradient>
  );
}

/**
 * Profile — bands from design/screens/profile.png (back 65, avatar 133,
 * personal info 235, card 267, account settings 471, card 503, tab bar 821).
 * Elements are placed absolutely from the layout rects so text line boxes do
 * not accumulate the 2-12 px drift the previous flow layout had.
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
        variant="creamBand"
        padded={false}
        edges={[]}
        statusBarStyle="dark-content"
      >
        <Stage minHeight={fy(L.tabBarTop)}>
          <View style={{ width: W, height: fy(L.tabBarTop) }}>
            <Pressable
              onPress={() => router.push('/home-dashboard')}
              accessibilityRole="button"
              accessibilityLabel="Back to home"
              className="items-center justify-center"
              style={{
                position: 'absolute',
                left: fx(L.back.x),
                top: fy(L.back.y),
                width: s(L.back.w),
                height: s(L.back.h),
              }}
            >
              <Image
                source={ASSETS.icons.undoBack}
                contentFit="contain"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={{ width: s(L.back.icon), height: s(L.back.icon) }}
              />
            </Pressable>

            <View
              className="items-center justify-center rounded-full bg-surface"
              style={{
                position: 'absolute',
                left: fx(L.avatar.x),
                top: fy(L.avatar.y),
                width: s(L.avatar.w),
                height: s(L.avatar.h),
                ...shadows.sm,
              }}
            >
              <Image
                source={ASSETS.icons.customerProfile}
                contentFit="contain"
                accessibilityLabel="Profile avatar"
                style={{ width: s(L.avatar.icon), height: s(L.avatar.icon) }}
              />
            </View>

            <AppText
              variant="display"
              fontSize={L.name.size}
              numberOfLines={L.name.lines}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
              style={{
                position: 'absolute',
                left: fx(L.name.x),
                top: fy(L.name.y),
                width: fx(L.name.w),
              }}
            >
              {username}
            </AppText>

            <AppText
              variant="body"
              fontSize={L.phone.size}
              className="text-text-primary"
              style={{
                position: 'absolute',
                left: fx(L.phone.x),
                top: fy(L.phone.y),
                width: fx(L.phone.w),
              }}
            >
              {phone}
            </AppText>

            <AppText
              variant="body"
              fontSize={L.sectionInfo.size}
              style={{ position: 'absolute', left: fx(L.sectionInfo.x), top: fy(L.sectionInfo.y) }}
            >
              Personal Information
            </AppText>

            <View
              style={{
                position: 'absolute',
                left: fx(L.card1.x),
                top: fy(L.card1.y),
                width: fx(L.card1.w),
              }}
            >
              <SectionCard
                radius={L.card1.radius}
                padTop={L.card1.padTop}
                padBottom={L.card1.padBottom}
              >
                <InfoRow
                  icon={ASSETS.icons.editPencil}
                  label="Change Account Info"
                  onPress={() => router.push('/account-settings')}
                  height={L.rows1[0]}
                />
                <InfoRow
                  icon={ASSETS.icons.forwardArrow}
                  label="Share Recipe"
                  onPress={showComingSoon}
                  height={L.rows1[1]}
                />
                <InfoRow
                  icon={ASSETS.icons.targetGoal}
                  label="Target Calorie"
                  onPress={showComingSoon}
                  last
                  height={L.rows1[2]}
                />
              </SectionCard>
            </View>

            <AppText
              variant="body"
              fontSize={L.sectionSettings.size}
              style={{
                position: 'absolute',
                left: fx(L.sectionSettings.x),
                top: fy(L.sectionSettings.y),
              }}
            >
              Account Settings
            </AppText>

            <View
              style={{
                position: 'absolute',
                left: fx(L.card2.x),
                top: fy(L.card2.y),
                width: fx(L.card2.w),
              }}
            >
              <SectionCard
                radius={L.card2.radius}
                flip
                padTop={L.card2.padTop}
                padBottom={L.card2.padBottom}
              >
                <InfoRow
                  icon={ASSETS.icons.settingsSlider}
                  label="Food Preferences"
                  onPress={showComingSoon}
                  height={L.rows2[0]}
                />
                <InfoRow
                  icon={ASSETS.icons.nightMode}
                  label="Theme"
                  onPress={showComingSoon}
                  height={L.rows2[1]}
                />
                <InfoRow
                  icon={ASSETS.icons.language}
                  label="App Language"
                  onPress={showComingSoon}
                  height={L.rows2[2]}
                />
                <InfoRow
                  icon={ASSETS.icons.termsAndConditions}
                  label="Terms and Conditions"
                  onPress={showComingSoon}
                  height={L.rows2[3]}
                />
                <InfoRow
                  icon={ASSETS.icons.logout}
                  label="Log Out / Sign Out"
                  onPress={handleLogout}
                  last
                  height={L.rows2[4]}
                />
              </SectionCard>
            </View>
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
