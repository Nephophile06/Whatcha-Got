import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Stage, AppText, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors, spacing } from '../../src/theme/tokens';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/account-created';

let LottieView;
try {
  LottieView = require('lottie-react-native').default || require('lottie-react-native');
} catch (error) {
  LottieView = null;
}

/**
 * The Create Account form, dimmed to 40% and repeated behind the success
 * panel. Rendered from absolute Figma rects so nothing re-flows.
 */
function SignupBackdrop() {
  const { W, H, fx, fy, s, offsetX } = useStage();
  const B = L.backdrop;

  const field = (y, icon, placeholder) => (
    <React.Fragment key={placeholder}>
      <Image
        source={icon}
        contentFit="contain"
        style={{
          position: 'absolute',
          left: fx(B.fieldBox.x - B.iconOffset),
          top: fy(y + (B.fieldBox.h - B.iconSize) / 2),
          width: s(B.iconSize),
          height: s(B.iconSize),
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: fx(B.fieldBox.x),
          top: fy(y),
          width: fx(B.fieldBox.w),
          height: s(B.fieldBox.h),
          justifyContent: 'center',
          paddingHorizontal: s(12),
        }}
        className="rounded-md border-[1.5px] border-border"
      >
        <AppText variant="caption" numberOfLines={1} className="text-text-muted">
          {placeholder}
        </AppText>
      </View>
    </React.Fragment>
  );

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: offsetX,
        top: 0,
        width: W,
        height: H,
        opacity: 0.4,
      }}
    >
      <AppText
        variant="display"
        fontSize={B.hello.size}
        numberOfLines={1}
        style={{ position: 'absolute', left: fx(B.hello.x), top: fy(B.hello.y) }}
      >
        Hello!!
      </AppText>
      <Image
        source={ASSETS.illustrations.helloKaomoji}
        contentFit="contain"
        style={{
          position: 'absolute',
          left: fx(B.kaomoji.x),
          top: fy(B.kaomoji.y),
          width: s(B.kaomoji.w),
          height: s(B.kaomoji.h),
        }}
      />
      <Image
        source={ASSETS.illustrations.catChefWhisking}
        contentFit="contain"
        style={{
          position: 'absolute',
          left: fx(B.cat.x),
          top: fy(B.cat.y),
          width: s(B.cat.w),
          height: s(B.cat.h),
        }}
      />

      <AppText
        variant="body"
        fontSize={B.copy.size}
        className="text-center text-text-primary"
        style={{
          position: 'absolute',
          left: fx(B.copy.x),
          top: fy(B.copy.y),
          width: fx(B.copy.w),
        }}
      >
        {"It's no fun eating alone! We're whisking up something sweet... Sign up so we can taste test together!"}
      </AppText>

      {field(
        B.fieldBox.y,
        ASSETS.illustrations.cuteBunny,
        'give yourself a unique username'
      )}
      {field(
        B.fieldBox.y + B.fieldStep,
        ASSETS.illustrations.thinkingCat,
        'password [minimum 5 char/letter]'
      )}

      <View
        style={{
          position: 'absolute',
          left: fx(B.button.x),
          top: fy(B.button.y),
          width: fx(B.button.w),
          height: s(B.button.h),
        }}
        className="items-center justify-center rounded-md bg-primary"
      >
        <AppText variant="button" numberOfLines={1} className="text-text-inverse">
          Purr-fect!
        </AppText>
      </View>
    </View>
  );
}

/**
 * Account Created — a wide burgundy ellipse rises above the dimmed signup form.
 * The ellipse clips its own gradient (overflow hidden) so Android gets the same
 * curved dome as the PNG instead of a flat edge.
 */
export default function AccountCreatedScreen() {
  const router = useRouter();
  const { W, H, fy, s, offsetX } = useStage();
  const domeWidth = s(L.dome.w);
  const domeHeight = s(L.dome.h);

  const background = (
    <View style={{ flex: 1 }}>
      <SignupBackdrop />

      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: offsetX + W / 2 - domeWidth / 2,
          top: fy(L.dome.y),
          width: domeWidth,
          height: domeHeight,
          borderRadius: domeWidth / 2,
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={[colors.primaryGlow, colors.primary, colors.primaryDeep]}
          locations={[0, 0.22, 0.37]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );

  return (
    <Screen
      variant="blue"
      padded={false}
      edges={[]}
      statusBarStyle="dark-content"
    >
      <Stage background={background}>
        <View style={{ width: W, minHeight: H, paddingTop: fy(L.bunny.y) }}>
          <View
            style={{
              alignSelf: 'center',
              width: s(L.bunny.w),
              height: s(L.bunny.h),
            }}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            {LottieView ? (
              <LottieView
                source={ASSETS.animations.bunnyAndChicks}
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }}
                accessibilityLabel="White bunny with chicks"
              />
            ) : null}
          </View>

          <AppText
            variant="display"
            fontSize={L.title.size}
            numberOfLines={L.title.lines}
            adjustsFontSizeToFit
            minimumFontScale={0.85}
            className="self-center text-center text-text-inverse"
            style={{
              marginTop: Math.max(
                fy(L.title.y - (L.bunny.y + L.bunny.h)),
                spacing.xs
              ),
              paddingHorizontal: s(16),
            }}
          >
            Whatcha Got? You! ✨
          </AppText>

          <AppText
            variant="body"
            fontSize={L.body.size}
            className="self-center text-center text-text-inverse"
            style={{
              marginTop: fy(L.body.y - (L.title.y + L.title.h)),
              width: s(L.body.w),
            }}
          >
            Your account is all set &amp; ready for some magic.
          </AppText>

          <Button
            title="take me home"
            variant="light"
            size="sm"
            onPress={() => router.replace('/home-loading')}
            style={{
              alignSelf: 'center',
              marginTop: fy(L.button.y - (L.body.y + L.body.h)),
              minWidth: s(L.button.w),
              minHeight: s(L.button.h),
            }}
          />

          <View style={{ flexGrow: 1, minHeight: s(8) }} />
        </View>
      </Stage>
    </Screen>
  );
}
