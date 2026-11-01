import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, shadows, spacing } from '../../theme/tokens';

export const Card = ({
  children,
  onPress,
  style,
  elevation = 'sm', // 'none' | 'sm' | 'md' | 'lg'
  bordered = true,
  ...props
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        bordered && styles.bordered,
        elevation !== 'none' && shadows[elevation],
        style,
      ]}
      {...props}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Card;

