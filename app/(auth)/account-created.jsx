import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Stage, AppText, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors, spacing } from '../../src/theme/tokens';
import { clamp, useStage } from '../../src/lib/stage';
import L from '../../src/layouts/account-created';

let LottieView;
try {
  LottieView = require('lottie-react-native').default || require('lottie-react-native');
} catch (error) {
  LottieView = null;
}

/**
 * The Create Account form, dimmed to 40% and repeated behind the success
 * panel. Rendered from absolute Figma rects so nothing re-flows. Text is black
 * inside the 40% group (the PNG's dimmed ink is #989898); the hairline fields
 * are black too, which lands them at the PNG's #919498 on white.
 */
function SignupBackdrop() {
  const { W, H, fx, fy, s, u, offsetX } = useStage();
  const B = L.backdrop;

  const field = (index) => {
    const top = B.form.y + index * B.form.step;
    const art = B.fields[index];
    return (
      <React.Fragment key={art.key}>
        <Image
          source={
            index === 0 ? ASSETS.illustrations.cuteBunny : ASSETS.illustrations.thinkingCat
          }
          contentFit="contain"
          style={{
            position: 'absolute',
            left: fx(B.form.x + art.x),
            top: fy(top + art.y),
            width: s(art.w),
            height: s(art.h),
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: fx(B.form.fieldX),
            top: fy(top),
            width: fx(B.form.fieldW),
            minHeight: s(B.form.fieldH),
            justifyContent: 'center',
            paddingHorizontal: s(11.5),
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.black,
            borderRadius: s(6),
          }}
        >
          <AppText
            variant="body"
            fontSize={14}
            numberOfLines={1}
            className="text-text-muted"
          >
            {index === 0
              ? 'give yourself a unique username'
              : 'password [minimum 5 char/letter]'}
          </AppText>
        </View>
      </React.Fragment>
    );
  };

  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
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
        className="text-black"
        style={{
          position: 'absolute',
          left: fx(B.hello.x),
          top: fy(B.hello.y),
          letterSpacing: s(B.hello.letterSpacing),
        }}
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
        className="text-center text-black"
        style={{
          position: 'absolute',
          left: fx(B.copy.x),
          top: fy(B.copy.y),
          width: fx(B.copy.w),
          // Decorative mirror of the form: scale with the stage (not the 0.85
          // text floor) so the three fixed lines never wrap into the fields.
          fontSize: B.copy.size * u,
          lineHeight: s(B.copy.lineHeight),
          letterSpacing: s(B.copy.letterSpacing),
        }}
      >
        {"It's no fun eating alone!\nWe're whisking up something sweet...\nSign up so we can taste test together!"}
      </AppText>

      {field(0)}
      {field(1)}

      <View
        style={{
          position: 'absolute',
          left: fx(B.button.x),
          top: fy(B.button.y),
          width: fx(B.button.w),
          minHeight: s(B.button.h),
          borderRadius: s(B.button.radius),
        }}
        className="items-center justify-center bg-primary"
      >
        <AppText
          variant="button"
          fontSize={B.button.size}
          numberOfLines={1}
          className="text-text-inverse"
          style={{ letterSpacing: s(B.copy.letterSpacing) }}
        >
          Purr-fect!
        </AppText>
      </View>
    </View>
  );
}

/**
 * Account Created — a wide burgundy ellipse rises above the dimmed signup form.
 * The ellipse clips its own gradient (overflow hidden) so Android gets the same
 * curved dome as the PNG instead of a flat edge. Stops are sampled from the
 * PNG over the visible 339px (the rest of the 900px circle is off-screen).
 */
export default function AccountCreatedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // `?freeze=1` keeps the bunny still for the dev fidelity capture.
  const frozen = params.freeze === '1';
  const { W, H, fy, s, u, offsetX } = useStage();
  const domeWidth = s(L.dome.w);
  const domeHeight = s(L.dome.h);

  const stop = (y) => (y - L.dome.y) / L.dome.h;

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
          colors={[
            colors.domeTop,
            colors.domeMid,
            colors.domeBottom,
            colors.domeBottom,
          ]}
          locations={[0, stop(740), stop(917), 1]}
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
                autoPlay={!frozen}
                loop={!frozen}
                progress={frozen ? 0 : undefined}
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
              marginTop: fy(L.title.y - (L.bunny.y + L.bunny.h)),
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
            size="md"
            onPress={() => router.replace('/home-loading')}
            style={{
              alignSelf: 'center',
              marginTop: fy(L.button.y - (L.body.y + L.body.h)),
              width: s(L.button.w),
              minHeight: s(L.button.h),
              borderRadius: s(L.button.radius),
              paddingHorizontal: 0,
              paddingTop: s(4),
            }}
            textStyle={{
              fontSize: L.button.size * clamp(u, 0.85, 1.2),
              letterSpacing: s(L.button.letterSpacing),
            }}
          />
        </View>
      </Stage>
    </Screen>
  );
}
