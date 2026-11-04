import React, { useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Stage, AppText, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { colors, shadows } from '../../src/theme/tokens';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/account-settings';

const ROSE_BUTTON = 'bg-primary-light border-primary-light';

/**
 * Account Settings — bands from design/screens/account-settings.png:
 * back 65, avatar 133, heading 236, fields 268 / 325 / 382, done 450,
 * heading 555, field 588, send 656, tab bar 821.
 *
 * The design draws outline-only fields with placeholder copy. The shared Input
 * keeps its persistent label by floating it at the placeholder position while
 * the field is empty (see Input's floatingLabel), so the default frame matches
 * the PNG and the label is still visible once the user types.
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
  const passwordError = Object.values(passwordErrors).find(Boolean);

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

  // The design's CTAs are 42 px tall (below the 44 px touch minimum). Keep the
  // drawn height and extend the press target vertically to 44 px on any stage.
  const hitSlopFor = (figmaHeight) => {
    const extra = Math.max(1, Math.ceil((44 - fy(figmaHeight)) / 2));
    return { top: extra, bottom: extra };
  };

  const fieldProps = {
    compact: true,
    floatingLabel: true,
    outline: true,
    flush: true,
    showPasswordToggle: false,
    boxStyle: { height: fy(L.field.h) },
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
                onPress={() => router.push('/profile')}
                accessibilityRole="button"
                accessibilityLabel="Back to profile"
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
                {currentPhone}
              </AppText>

              <AppText
                variant="body"
                fontSize={L.heading1.size}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                className="text-center"
                style={{ position: 'absolute', left: 0, right: 0, top: fy(L.heading1.y) }}
              >
                Update password
              </AppText>

              <View
                style={{
                  position: 'absolute',
                  left: fx(L.field.x),
                  top: fy(L.field1Y),
                  width: fx(L.field.w),
                }}
              >
                <Input
                  {...fieldProps}
                  label="Current Password"
                  value={currentPassword}
                  onChangeText={(value) => {
                    setCurrentPassword(value);
                    clearPasswordError('current');
                  }}
                  error={Boolean(passwordErrors.current)}
                  secure
                  autoComplete="current-password"
                />
              </View>

              <View
                style={{
                  position: 'absolute',
                  left: fx(L.field.x),
                  top: fy(L.field2Y),
                  width: fx(L.field.w),
                }}
              >
                <Input
                  {...fieldProps}
                  label="New password"
                  value={newPassword}
                  onChangeText={(value) => {
                    setNewPassword(value);
                    clearPasswordError('new');
                  }}
                  error={Boolean(passwordErrors.new)}
                  secure
                  autoComplete="new-password"
                />
              </View>

              <View
                style={{
                  position: 'absolute',
                  left: fx(L.field.x),
                  top: fy(L.field3Y),
                  width: fx(L.field.w),
                }}
              >
                <Input
                  {...fieldProps}
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                    clearPasswordError('confirm');
                  }}
                  error={Boolean(passwordErrors.confirm)}
                  secure
                  autoComplete="new-password"
                />
              </View>

              {passwordError ? (
                <AppText
                  variant="caption"
                  className="text-center text-error"
                  numberOfLines={1}
                  style={{ position: 'absolute', left: 0, right: 0, top: fy(L.error1Y) }}
                >
                  {passwordError}
                </AppText>
              ) : null}

              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: fy(L.done.y),
                  alignItems: 'center',
                }}
              >
                <Button
                  title="done"
                  variant="light"
                  size="sm"
                  textSize={L.done.size}
                  loading={passwordLoading}
                  onPress={handlePasswordSubmit}
                  hitSlop={hitSlopFor(L.done.h)}
                  className={ROSE_BUTTON}
                  textStyle={{ color: colors.textInverse }}
                  style={{
                    backgroundColor: colors.primaryLight,
                    borderColor: colors.primaryLight,
                    minWidth: fx(L.done.w),
                    minHeight: fy(L.done.h),
                    height: fy(L.done.h),
                    paddingHorizontal: 0,
                    borderRadius: s(L.done.radius),
                  }}
                />
              </View>

              <AppText
                variant="body"
                fontSize={L.heading2.size}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                className="text-center"
                style={{ position: 'absolute', left: 0, right: 0, top: fy(L.heading2.y) }}
              >
                Update Phone Number
              </AppText>

              <View
                style={{
                  position: 'absolute',
                  left: fx(L.field.x),
                  top: fy(L.field4Y),
                  width: fx(L.field.w),
                }}
              >
                <Input
                  {...fieldProps}
                  label="New Phone Number"
                  value={phone}
                  onChangeText={(value) => {
                    setPhone(value);
                    if (phoneError) setPhoneError('');
                  }}
                  error={Boolean(phoneError)}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                />
              </View>

              {phoneError ? (
                <AppText
                  variant="caption"
                  className="text-center text-error"
                  numberOfLines={1}
                  style={{ position: 'absolute', left: 0, right: 0, top: fy(L.error2Y) }}
                >
                  {phoneError}
                </AppText>
              ) : null}

              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: fy(L.send.y),
                  alignItems: 'center',
                }}
              >
                <Button
                  title="send magic"
                  variant="light"
                  size="sm"
                  textSize={L.send.size}
                  loading={phoneLoading}
                  onPress={handlePhoneSubmit}
                  hitSlop={hitSlopFor(L.send.h)}
                  className={ROSE_BUTTON}
                  textStyle={{ color: colors.textInverse }}
                  style={{
                    backgroundColor: colors.primaryLight,
                    borderColor: colors.primaryLight,
                    minWidth: fx(L.send.w),
                    minHeight: fy(L.send.h),
                    height: fy(L.send.h),
                    paddingHorizontal: 0,
                    borderRadius: s(L.send.radius),
                  }}
                />
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
    </KeyboardAvoidingView>
  );
}
