import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Stage, AppText, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors } from '../../src/theme/tokens';
import { clamp, useStage } from '../../src/lib/stage';
import L from '../../src/layouts/forgot-password';

function MethodCard({ data, icon, iconBox, title, description, onPress, selected, strong }) {
  const { fx, fy, s, u } = useStage();
  const scaled = (size) => Math.round(size * clamp(u, 0.85, 1.2) * 100) / 100;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${title}. ${description}`}
      style={[
        {
          width: '100%',
          minHeight: fy(data.h),
          borderRadius: s(data.r),
          borderWidth: L.card.border,
          borderColor: strong ? colors.cardLineStrong : colors.cardLineSoft,
          backgroundColor: colors.cardVeil,
        },
        strong
          ? {
              shadowColor: colors.primary,
              shadowOpacity: 0.16,
              shadowRadius: s(2),
              shadowOffset: { width: 0, height: s(1) },
              elevation: 1,
            }
          : null,
      ]}
    >
      <Image
        source={icon}
        contentFit="contain"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          position: 'absolute',
          left: fx(iconBox.x),
          top: fy(iconBox.y),
          width: s(iconBox.w),
          height: s(iconBox.h),
        }}
      />

      <View
        style={{
          marginLeft: fx(L.card.textX),
          marginTop: fy(data.titleY),
          maxWidth: fx(L.card.descW),
          flexShrink: 1,
        }}
      >
        <AppText
          variant="display"
          fontSize={L.card.titleSize}
          className="text-black"
          style={{ lineHeight: scaled(L.card.titleLineH) }}
        >
          {title}
        </AppText>
        <AppText
          variant="body"
          fontSize={L.card.descSize}
          style={{
            marginTop: fy(data.descY - (data.titleY + L.card.titleLineH)),
            lineHeight: scaled(L.card.descLineH),
            color: colors.textWarmMuted,
          }}
        >
          {description}
        </AppText>
      </View>
    </Pressable>
  );
}

/**
 * Forgot Password — bands from design/screens/forgot-password.png (title 97,
 * copy 164, prompt 255, cards 285 / 397, check 539, art 600).
 *
 * The watercolour wash, the chick/bunny and both card icons are cropped from
 * the 3x PNG (no matching exports exist). The card borders are the burgundy
 * token at 26% (Email) and 67% (Phone). Phone recovery is still unavailable,
 * so tapping it explains that instead of switching method.
 */
export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { W, H, fx, fy, s, u } = useStage();
  const [method, setMethod] = useState('email');
  const [toast, setToast] = useState(null);
  const scaled = (size) => Math.round(size * clamp(u, 0.85, 1.2) * 100) / 100;

  return (
    <View style={{ flex: 1 }}>
      <Screen
        variant="mintPage"
        padded={false}
        edges={[]}
        statusBarStyle="dark-content"
      >
        <Stage>
          <View style={{ width: W, minHeight: H }}>
            <Image
              source={ASSETS.images.forgotPasswordBadge}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                position: 'absolute',
                left: fx(L.broccoli.x),
                top: fy(L.broccoli.y),
                width: s(L.broccoli.w),
                height: s(L.broccoli.h),
              }}
            />

            <View style={{ paddingTop: fy(L.title.y), paddingLeft: fx(L.title.x) }}>
              <AppText
                variant="display"
                fontSize={L.title.size}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                className="text-black"
                style={{ width: fx(L.title.w), lineHeight: scaled(L.title.lineH) }}
              >
                {"Need a little help\nGetting Back?"}
              </AppText>

              <AppText
                variant="body"
                fontSize={L.copy.size}
                className="text-black"
                style={{
                  marginTop: fy(L.copy.y - (L.title.y + L.title.h)),
                  marginLeft: fx(L.copy.x - L.title.x),
                  width: fx(L.copy.w),
                  lineHeight: scaled(L.copy.lineH),
                }}
              >
                {"It happens to all of us!\nDon't worry we'll send a magic ^_^"}
              </AppText>
            </View>

            <AppText
              variant="body"
              fontSize={L.choose.size}
              className="text-black"
              style={{
                marginTop: fy(L.choose.y - (L.copy.y + L.copy.h)),
                marginLeft: fx(L.choose.x),
                maxWidth: fx(L.choose.w),
              }}
            >
              Choose where you'd like to receive:
            </AppText>

            <View
              style={{
                marginTop: fy(L.cardEmail.y - (L.choose.y + L.choose.h)),
                marginLeft: fx(L.cardEmail.x),
                width: fx(L.cardEmail.w),
                rowGap: fy(L.cardPhone.y - (L.cardEmail.y + L.cardEmail.h)),
              }}
            >
              <MethodCard
                data={L.cardEmail}
                icon={ASSETS.images.forgotEmailIcon}
                iconBox={L.card.iconEmail}
                title="Send to Email 💌"
                description="Send a 6-digit magic OTP to your registered email."
                selected={method === 'email'}
                onPress={() => setMethod('email')}
              />

              <MethodCard
                data={L.cardPhone}
                icon={ASSETS.images.forgotPhoneIcon}
                iconBox={L.card.iconPhone}
                title="Send to Phone ☎️"
                description="Send a quick SMS OTP right to your phone number."
                selected={method === 'phone'}
                strong
                onPress={() =>
                  setToast({ type: 'info', message: 'Phone recovery is coming soon' })
                }
              />
            </View>

            <Button
              title="check"
              size="sm"
              onPress={() => router.push('/(auth)/otp')}
              hitSlop={{ top: 4, bottom: 4 }}
              style={{
                alignSelf: 'flex-start',
                marginTop: fy(L.check.y - (L.cardPhone.y + L.cardPhone.h)),
                marginLeft: fx(L.check.x),
                width: s(L.check.w),
                minHeight: Math.max(44, s(L.check.h)),
                borderRadius: s(L.check.r),
                paddingHorizontal: 0,
              }}
              textStyle={{
                fontSize: scaled(L.check.size),
                lineHeight: scaled(L.check.size) * 1.35,
              }}
            />

            <Image
              source={ASSETS.images.forgotPasswordArt}
              contentFit="fill"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                width: W,
                height: (W * L.art.h) / L.art.w,
                marginTop: fy(L.art.y - (L.check.y + L.check.h)),
              }}
            />
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
    </View>
  );
}
