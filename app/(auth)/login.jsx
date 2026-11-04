import React, { useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Stage, AppText, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors } from '../../src/theme/tokens';
import { useAuthStore } from '../../src/store/authStore';
import { clamp, useStage } from '../../src/lib/stage';
import L from '../../src/layouts/login';

/**
 * Login — measured from design/screens/login.png (412 x 917).
 * Transparent hairline fields at x113.2 (249.4 x 44, 84 step) with the art
 * outside the box, centred CTA / divider / Google, and the chef duck anchored
 * 52px above the bottom edge. The PNG labels the first field "your sweet
 * username"; we keep that copy but validate it as an email for the future
 * Supabase flow. There is no create-account link in the design (Welcome owns
 * sign-up), so the screen ends after the Google button.
 */
export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { W, H, fx, fy, s, u } = useStage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const scaled = (size) => Math.round(size * clamp(u, 0.85, 1.2) * 100) / 100;

  const clearError = (field) =>
    setErrors((current) => (current[field] ? { ...current, [field]: null } : current));

  const validate = () => {
    const next = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      next.email = 'Enter a valid email address';
    }

    if (!password) next.password = 'Password is required';
    else if (password.length < 8) next.password = 'Use at least 8 characters';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (loading || !validate()) return;

    setLoading(true);
    const result = await login({ email: email.trim(), password });
    setLoading(false);

    if (!result.success) {
      setToast({ type: 'error', message: result.error });
      return;
    }

    router.replace('/home-loading');
  };

  const fieldBox = (hasError) => ({
    minHeight: s(L.field.h),
    borderRadius: s(L.field.radius),
    borderWidth: L.field.border,
    borderColor: hasError ? colors.error : colors.fieldLine,
    backgroundColor: 'transparent',
    paddingHorizontal: s(L.field.padH),
  });

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen
        variant="mintPage"
        padded={false}
        edges={[]}
        statusBarStyle="dark-content"
      >
        <Stage>
          <View style={{ width: W, minHeight: H }}>
            <Image
              source={ASSETS.images.twoCherries}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                position: 'absolute',
                left: fx(L.cherries.x),
                top: fy(L.cherries.y),
                width: s(L.cherries.w),
                height: s(L.cherries.h),
              }}
            />
            <Image
              source={ASSETS.images.peeledBanana}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                position: 'absolute',
                left: fx(L.banana.x),
                top: fy(L.banana.y),
                width: s(L.banana.w),
                height: s(L.banana.h),
              }}
            />

            <Image
              source={ASSETS.illustrations.cuteBunny}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                position: 'absolute',
                left: fx(L.icons.bunny.x),
                top: fy(L.icons.bunny.y),
                width: s(L.icons.bunny.w),
                height: s(L.icons.bunny.h),
              }}
            />
            <Image
              source={ASSETS.illustrations.thinkingCat}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                position: 'absolute',
                left: fx(L.icons.cat.x),
                top: fy(L.icons.cat.y),
                width: s(L.icons.cat.w),
                height: s(L.icons.cat.h),
              }}
            />

            <View style={{ paddingTop: fy(L.title.y), paddingLeft: fx(L.title.x) }}>
              <AppText
                variant="display"
                fontSize={L.title.size}
                numberOfLines={L.title.lines}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                className="text-black"
                style={{ width: fx(L.title.w) }}
              >
                Welcome Back!
              </AppText>
            </View>

            <AppText
              variant="body"
              fontSize={L.copy.size}
              className="text-black"
              style={{
                marginTop: fy(L.copy.y - (L.title.y + L.title.h)),
                marginLeft: fx(L.copy.x),
                width: fx(L.copy.w),
                lineHeight: scaled(L.copy.size) * L.copy.lineH,
              }}
            >
              {"We missed you :(\nLet's get back into your world of flavors."}
            </AppText>

            <View style={{ marginTop: fy(L.form.y - (L.copy.y + L.copy.h)) }}>
              <Input
                compact
                flush
                accessibilityLabel="Username"
                placeholder="your sweet username"
                placeholderTextColor={colors.fieldLine}
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  clearError('email');
                }}
                error={errors.email}
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                style={{ marginLeft: fx(L.field.x), width: fx(L.field.w) }}
                boxStyle={fieldBox(Boolean(errors.email))}
              />

              <Input
                compact
                flush
                accessibilityLabel="Password"
                placeholder="secret password ^_^"
                placeholderTextColor={colors.fieldLine}
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  clearError('password');
                }}
                error={errors.password}
                secure
                showPasswordToggle={false}
                autoComplete="current-password"
                textContentType="password"
                style={{
                  marginLeft: fx(L.field.x),
                  marginTop: fy(L.field.step - L.field.h),
                  width: fx(L.field.w),
                }}
                boxStyle={fieldBox(Boolean(errors.password))}
              />

              <Pressable
                onPress={() => router.push('/(auth)/forgot-password')}
                accessibilityRole="link"
                accessibilityLabel="I forgot my password"
                style={{
                  alignSelf: 'flex-end',
                  marginTop: fy(L.forgot.top - (L.form.y + L.field.step + L.field.h)),
                  marginRight: fx(L.forgot.right),
                  minHeight: L.forgot.lineH,
                  justifyContent: 'center',
                }}
              >
                <AppText
                  variant="body"
                  fontSize={L.forgot.size}
                  className="underline"
                  style={{ color: colors.fieldLine, letterSpacing: s(-0.1) }}
                >
                  I forgot my password T.T
                </AppText>
              </Pressable>

              <Button
                title="Hurryyy!"
                size="md"
                loading={loading}
                onPress={handleLogin}
                style={{
                  alignSelf: 'center',
                  marginTop: fy(L.button.y - (L.forgot.top + L.forgot.lineH)),
                  width: s(L.button.w),
                  minHeight: s(L.button.h),
                  borderRadius: s(L.button.radius),
                  paddingHorizontal: 0,
                }}
                textStyle={{
                  fontSize: scaled(L.button.size),
                  lineHeight: scaled(L.button.size) * 1.35,
                }}
              />

              <View
                style={{
                  marginTop: fy(L.divider.y - (L.button.y + L.button.h)),
                  alignSelf: 'center',
                  width: fx(L.divider.w),
                  minHeight: fy(L.divider.rowH),
                }}
                className="flex-row items-center"
              >
                <View
                  className="h-px flex-1"
                  style={{ backgroundColor: colors.lineSoft }}
                />
                <AppText
                  variant="body"
                  fontSize={L.divider.size}
                  style={{
                    color: colors.fieldLine,
                    marginHorizontal: s(L.divider.gap),
                  }}
                >
                  or
                </AppText>
                <View
                  className="h-px flex-1"
                  style={{ backgroundColor: colors.lineSoft }}
                />
              </View>

              <Button
                title="login with google"
                variant="google"
                size="sm"
                icon={
                  <Image
                    source={ASSETS.icons.google}
                    contentFit="contain"
                    style={{
                      width: s(L.google.icon),
                      height: s(L.google.icon),
                      marginRight: s(L.google.iconGap),
                    }}
                  />
                }
                onPress={() => setToast({ type: 'info', message: 'Coming soon' })}
                style={{
                  alignSelf: 'center',
                  marginTop: fy(L.google.y - (L.divider.y + L.divider.rowH)),
                  width: s(L.google.w),
                  minHeight: s(L.google.h),
                  borderRadius: s(L.google.radius),
                  paddingHorizontal: 0,
                  paddingTop: s(2),
                }}
                textStyle={{
                  fontSize: scaled(L.google.size),
                  lineHeight: scaled(L.google.size) * 1.35,
                  color: colors.black,
                }}
              />
            </View>

            <Image
              source={ASSETS.illustrations.loginChefCat}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                alignSelf: 'flex-start',
                marginTop: fy(L.duck.y - (L.google.y + L.google.h)),
                marginLeft: fx(L.duck.x),
                width: s(L.duck.w),
                height: s(L.duck.h),
              }}
            />

            <View style={{ flexGrow: 1, minHeight: s(8) }} />
          </View>
        </Stage>
      </Screen>

      {toast ? (
        <View className="absolute left-md right-md top-xxl">
          <Toast
            type={toast.type}
            message={toast.message}
            onDismiss={() => setToast(null)}
          />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}
