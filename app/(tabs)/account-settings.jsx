import React, { useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Stage, AppText, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { colors } from '../../src/theme/tokens';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/account-settings';

const ROSE_BUTTON = 'bg-primary-light border-primary-light';
// The dense label is 11px on a 15px line so a label + 44px field is ~57px,
// the Figma row step. Fields stack in flow and can never overlap.
const DENSE_LABEL_LINE = 15;
const HEADING_LINE = 1.5; // AppText body line-height ratio

/**
 * Account Settings — lives inside app/(tabs) because the PNG shows the bottom
 * tab bar (Profile stays highlighted). Bands from account-settings.png: back
 * 70, avatar 133, heading 224, fields 268 / 325 / 382, done 450, heading 540,
 * field 588, send 656. The native header is disabled and the screen paints its
 * own back arrow (to /profile) + cream edge-to-edge background.
 */
export default function AccountSettingsScreen() {
  const router = useRouter();
  const { W, fx, fy, s } = useStage();
  const user = useAuthStore((state) => state.user);
  const updatePhone = useAuthStore((state) => state.updatePhone);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [phoneLoading, setPhoneLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const username = user?.username || 'Nondiní';
  const currentPhone = user?.phone || '01xxxxxxxxx';

  const clearPasswordError = (field) =>
    setPasswordErrors((current) =>
      current[field] ? { ...current, [field]: null } : current
    );

  const handlePasswordSubmit = () => {
    if (passwordLoading) return;

    const next = {};
    if (!currentPassword) next.current = 'Enter your current password';
    if (!newPassword) next.new = 'Enter a new password';
    else if (newPassword.length < 8) next.new = 'Use at least 8 characters';
    if (!confirmPassword) next.confirm = 'Confirm your new password';
    else if (confirmPassword !== newPassword) next.confirm = 'Passwords do not match';

    setPasswordErrors(next);
    if (Object.keys(next).length > 0) return;

    setPasswordLoading(true);
    setTimeout(() => {
      setPasswordLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setToast({ type: 'success', message: 'Password updated successfully' });
    }, 1000);
  };

  const handlePhoneSubmit = () => {
    if (phoneLoading) return;

    const trimmed = phone.trim();
    const digits = trimmed.replace(/[^\d]/g, '');

    if (!trimmed) {
      setPhoneError('Enter a phone number');
      return;
    }
    if (digits.length < 10 || digits.length > 15) {
      setPhoneError('Use 10-15 digits');
      return;
    }

    setPhoneError('');
    setPhoneLoading(true);
    setTimeout(() => {
      setPhoneLoading(false);
      updatePhone(trimmed);
      setPhone('');
      setToast({ type: 'success', message: 'Phone number updated' });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
                onPress={() => router.push('/profile')}
                accessibilityRole="button"
                accessibilityLabel="Back to profile"
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
                    {currentPhone}
                  </AppText>
                </View>
              </View>

              <AppText
                variant="body"
                fontSize={L.heading1.size}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                className="text-center"
                style={{ marginTop: fy(L.heading1.y - (L.avatar.y + L.avatar.h)) }}
              >
                Update password
              </AppText>

              <View
                style={{
                  alignSelf: 'center',
                  width: fx(L.field.w),
                  marginTop: Math.max(
                    fy(L.field1Y - DENSE_LABEL_LINE) -
                      (fy(L.heading1.y) + s(L.heading1.size * HEADING_LINE)),
                    0
                  ),
                }}
              >
                <Input
                  compact
                  denseLabel
                  flush
                  label="Current Password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChangeText={(value) => {
                    setCurrentPassword(value);
                    clearPasswordError('current');
                  }}
                  error={passwordErrors.current}
                  secure
                  autoComplete="current-password"
                />
                <Input
                  compact
                  denseLabel
                  flush
                  label="New password"
                  placeholder="New password"
                  value={newPassword}
                  onChangeText={(value) => {
                    setNewPassword(value);
                    clearPasswordError('new');
                  }}
                  error={passwordErrors.new}
                  secure
                  autoComplete="new-password"
                />
                <Input
                  compact
                  denseLabel
                  flush
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                    clearPasswordError('confirm');
                  }}
                  error={passwordErrors.confirm}
                  secure
                  autoComplete="new-password"
                />
              </View>

              <Button
                title="done"
                size="md"
                loading={passwordLoading}
                onPress={handlePasswordSubmit}
                className={ROSE_BUTTON}
                textStyle={{ color: colors.primaryDark }}
                style={{
                  marginTop: fy(L.done.y - (L.field3Y + 44)),
                  minWidth: fx(L.done.w),
                  minHeight: Math.max(s(L.done.h), 44),
                }}
              />

              <AppText
                variant="body"
                fontSize={L.heading2.size}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                className="text-center"
                style={{ marginTop: fy(L.heading2.y - (L.done.y + 44)) }}
              >
                Update Phone Number
              </AppText>

              <View
                style={{
                  alignSelf: 'center',
                  width: fx(L.field.w),
                  marginTop: Math.max(
                    fy(L.field4Y - DENSE_LABEL_LINE) -
                      (fy(L.heading2.y) + s(L.heading2.size * HEADING_LINE)),
                    0
                  ),
                }}
              >
                <Input
                  compact
                  denseLabel
                  flush
                  label="New Phone Number"
                  placeholder="New Phone Number"
                  value={phone}
                  onChangeText={(value) => {
                    setPhone(value);
                    if (phoneError) setPhoneError('');
                  }}
                  error={phoneError}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                />
              </View>

              <Button
                title="send magic"
                size="md"
                loading={phoneLoading}
                onPress={handlePhoneSubmit}
                className={ROSE_BUTTON}
                textStyle={{ color: colors.primaryDark }}
                style={{
                  marginTop: fy(L.send.y - (L.field4Y + 44)),
                  minWidth: fx(L.send.w),
                  minHeight: Math.max(s(L.send.h), 44),
                }}
              />

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
    </KeyboardAvoidingView>
  );
}
