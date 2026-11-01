import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Card } from '../../src/components/ui';
import { useAuthStore } from '../../src/store/authStore';
import { colors, radius, spacing, typography } from '../../src/theme/tokens';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/welcome');
  };

  const displayName = user?.user_metadata?.full_name || 'Home Cook';
  const displayEmail = user?.email || 'guest@whatchagot.app';

  return (
    <Screen scrollable style={styles.container}>
      {/* Profile Card */}
      <Card style={styles.profileHeaderCard} elevation="md">
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>👨‍🍳</Text>
        </View>
        <Text style={styles.userName}>{displayName}</Text>
        <Text style={styles.userEmail}>{displayEmail}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Free Plan • Kitchen Explorer</Text>
        </View>
      </Card>

      {/* Settings & Shortcuts Menu */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionHeader}>Preferences & Setup</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/target-calorie')}
          accessibilityRole="button"
        >
          <Text style={styles.menuIcon}>🎯</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Calorie & Dietary Goals</Text>
            <Text style={styles.menuSubtitle}>Adjust daily target & dietary restrictions</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/account-settings')}
          accessibilityRole="button"
        >
          <Text style={styles.menuIcon}>⚙️</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Account Settings</Text>
            <Text style={styles.menuSubtitle}>Manage email, password, and security</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/share-recipe')}
          accessibilityRole="button"
        >
          <Text style={styles.menuIcon}>📝</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Share a Recipe</Text>
            <Text style={styles.menuSubtitle}>Publish your own budget meal creation</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* App Info & Sign out */}
      <View style={styles.bottomSection}>
        <Button
          title="Log Out"
          variant="outline"
          size="md"
          onPress={handleSignOut}
          style={styles.logoutBtn}
          textStyle={styles.logoutText}
        />
        <Text style={styles.versionText}>Whatcha Got? • Version 1.0.0</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  profileHeaderCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarEmoji: {
    fontSize: 42,
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  badge: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  menuSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    fontSize: typography.fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 22,
    color: colors.textMuted,
    fontWeight: '600',
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoutBtn: {
    width: '100%',
    borderColor: colors.error,
    marginBottom: spacing.md,
  },
  logoutText: {
    color: colors.error,
  },
  versionText: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
});

