import React from 'react';
import { View } from 'react-native';
import { Screen, AppText } from '../ui';

/**
 * ComingSoonScreen — placeholder for features that are designed later.
 * Only Screen + AppText + tokens, so no legacy styles survive.
 */
export function ComingSoonScreen({ title }) {
  return (
    <Screen variant="cream" padded={false} edges={[]} statusBarStyle="dark-content">
      <View className="flex-1 items-center justify-center px-xl">
        <AppText variant="display" fontSize={34} className="text-center">
          {title}
        </AppText>
        <AppText variant="body" className="mt-md text-center text-text-secondary">
          Coming soon
        </AppText>
      </View>
    </Screen>
  );
}

export default ComingSoonScreen;
