/**
 * EmptyState — illustration + title + subtitle + optional CTA.
 *
 * Props:
 * - illustration: image source (defaults to the thinking-cat illustration from assets)
 * - title: string
 * - subtitle: string (legacy alias: description)
 * - actionLabel / onAction: primary CTA
 * - secondaryActionLabel / onSecondaryAction: optional secondary CTA
 * - className / style / illustrationClassName
 */
import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { ASSETS } from '../../constants/assets';
import { AppText } from './AppText';
import { Button } from './Button';
import { cx } from './cx';

export function EmptyState({
  illustration = ASSETS.illustrations.thinkingCat,
  title,
  subtitle,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
  style,
  illustrationClassName,
}) {
  const body = subtitle || description;

  return (
    <View
      className={cx('items-center justify-center px-lg py-xl', className)}
      style={style}
    >
      {illustration ? (
        <View className={cx('h-40 w-40 items-center justify-center', illustrationClassName)}>
          <Image
            source={illustration}
            style={{ width: '100%', height: '100%' }}
            contentFit="contain"
            accessibilityIgnoresInvertColors
          />
        </View>
      ) : null}

      {title ? (
        <AppText variant="heading" className="mt-md text-center">
          {title}
        </AppText>
      ) : null}

      {body ? (
        <AppText variant="body" fontSize={14} className="mt-sm text-center text-text-secondary">
          {body}
        </AppText>
      ) : null}

      {actionLabel || secondaryActionLabel ? (
        <View className="mt-lg w-full max-w-[280px] gap-sm">
          {actionLabel && onAction ? (
            <Button title={actionLabel} onPress={onAction} fullWidth />
          ) : null}
          {secondaryActionLabel && onSecondaryAction ? (
            <Button
              title={secondaryActionLabel}
              onPress={onSecondaryAction}
              variant="secondary"
              fullWidth
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

export default EmptyState;
