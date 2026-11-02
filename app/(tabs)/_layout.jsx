import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '../../src/components/ui';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => {
        const routeName = props.state.routes[props.state.index]?.name;
        const cream = routeName === 'profile' || routeName === 'account-settings';

        return <TabBar {...props} fallbackKey="profile" cream={cream} />;
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="calorie" options={{ title: 'Calorie' }} />
      <Tabs.Screen name="list" options={{ title: 'List' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      {/* Account Settings shows the tab bar in the PNG but is not a tab itself.
          It stays navigable; our custom TabBar only renders the five tabs. */}
      <Tabs.Screen name="account-settings" options={{ title: 'Account Settings' }} />
    </Tabs>
  );
}
