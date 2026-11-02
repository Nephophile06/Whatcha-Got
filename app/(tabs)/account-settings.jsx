import React, { useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, AppText, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { useScale } from '../../src/lib/scale';
import { colors } from '../../src/theme/tokens';

const ROSE_BUTTON = 'bg-primary-light border-primary-light';

/**
 * Account Settings — lives inside app/(tabs) because the PNG shows the bottom
 * tab bar (Profile stays highlighted). The native header is disabled and the
 * screen paints its own back arrow + cream edge-to-edge background.
 */
export default function AccountSettingsScreen() {
  const router = useRouter();
  const { width } = useScale();
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
          scroll
          padded={false}
          contentContainerClassName="pb-xl"
          statusBarStyle="dark-content"
        >
          <View className="px-md pt-sm">
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
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
                  {currentPhone}
                </AppText>
              </View>
            </View>
          </View>

          <View
            className="mt-lg w-full self-center px-lg"
            style={{ maxWidth: Math.min(width * 0.62, 280) }}
          >
            <AppText variant="heading" fontSize={20} className="mb-md text-center">
              Update password
            </AppText>

            <Input
              compact
              label="Current Password"
              placeholder="Password"
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
              label="Confirm Password"
              placeholder="Repeat"
              value={confirmPassword}
              onChangeText={(value) => {
                setConfirmPassword(value);
                clearPasswordError('confirm');
              }}
              error={passwordErrors.confirm}
              secure
              autoComplete="new-password"
            />

            <Button
              title="done"
              size="md"
              loading={passwordLoading}
              onPress={handlePasswordSubmit}
              className={`mt-sm ${ROSE_BUTTON}`}
              textStyle={{ color: colors.primaryDark }}
            />

            <AppText variant="heading" fontSize={20} className="mb-md mt-xl text-center">
              Update Phone Number
            </AppText>

            <Input
              compact
              label="New Phone Number"
              placeholder="Phone number"
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

            <Button
              title="send magic"
              size="md"
              loading={phoneLoading}
              onPress={handlePhoneSubmit}
              className={`mt-sm ${ROSE_BUTTON}`}
              textStyle={{ color: colors.primaryDark }}
            />
          </View>
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
