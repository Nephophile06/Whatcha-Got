/**
 * TEMPORARY — Phase 1 UI kit preview.
 * Route: /_dev/ui-kit
 * Delete this folder once the real screens are built.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Screen,
  Button,
  Input,
  OtpInput,
  Toast,
  EmptyState,
  Skeleton,
  Chip,
  CategoryTile,
  Card,
  TabBar,
} from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors, gradients } from '../../src/theme/tokens';

function Section({ title, hint, children }) {
  return (
    <View className="mb-xl">
      <Text className="font-display text-xl text-text-primary">{title}</Text>
      {hint ? (
        <Text className="mt-xs font-sans text-xs text-text-muted">{hint}</Text>
      ) : null}
      <View className="mt-sm gap-sm">{children}</View>
    </View>
  );
}

function InputsDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('maya@campus.edu');
  const [password, setPassword] = useState('burnttoast');
  const [username, setUsername] = useState('may');
  const [phone] = useState('+1 555 019 4471');

  return (
    <View>
      <Input
        label="Full name"
        required
        value={name}
        onChangeText={setName}
        placeholder="Maya Chen"
        helperText="Shown on recipes you share."
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        helperText="This one is filled."
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secure
        placeholder="Minimum 5 characters"
        helperText="Tap the eye to reveal the value."
      />
      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        error="Choose at least 5 characters."
      />
      <Input
        label="Phone number"
        value={phone}
        disabled
        helperText="Managed in Account Settings."
      />
    </View>
  );
}

function OtpDemo() {
  const [code, setCode] = useState('482');
  const [expired, setExpired] = useState(false);

  return (
    <View>
      <Text className="font-sans-medium text-sm text-text-secondary">Empty</Text>
      <OtpInput value="" onChange={() => {}} />

      <Text className="font-sans-medium text-sm text-text-secondary">
        Filled · tap Confirm to preview the error state
      </Text>
      <OtpInput
        value={code}
        onChange={(next) => {
          setCode(next);
          setExpired(false);
        }}
        error={expired}
        errorMessage="That code has expired. Try again."
      />
      <Button
        title="Confirm"
        onPress={() => setExpired(false)}
        fullWidth
      />
      <Button
        title={expired ? 'Clear error' : 'Preview error state'}
        variant="secondary"
        onPress={() => setExpired((current) => !current)}
        fullWidth
        className="mt-sm"
      />
    </View>
  );
}

function ToastDemo() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Button
        title="Show banners again"
        variant="secondary"
        onPress={() => setVisible(true)}
        fullWidth
      />
    );
  }

  return (
    <>
      <Toast
        type="success"
        message="Goal saved. 1,840 kcal is your daily target."
      />
      <Toast
        type="error"
        message="Recipe upload failed. Check your connection."
        onRetry={() => {}}
        onDismiss={() => setVisible(false)}
      />
      <Toast
        type="offline"
        message="You're offline. Showing saved recipes."
        onDismiss={() => setVisible(false)}
      />
      <Toast
        type="info"
        message="Tip: add pantry staples once and reuse them."
        onDismiss={() => setVisible(false)}
      />
    </>
  );
}

function ChipsDemo() {
  const [selected, setSelected] = useState(['Comfort', 'Budget']);

  const toggle = (label) => {
    setSelected((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    );
  };

  return (
    <View className="flex-row flex-wrap gap-sm">
      {['Comfort', 'Budget', 'Under 20m', 'Healthy', 'Veggie'].map((label) => (
        <Chip
          key={label}
          label={label}
          selected={selected.includes(label)}
          onPress={() => toggle(label)}
        />
      ))}
    </View>
  );
}

function TilesDemo() {
  const [selected, setSelected] = useState(['polao', 'almonds']);

  const toggle = (key) => {
    setSelected((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  };

  return (
    <View className="flex-row flex-wrap gap-sm">
      <CategoryTile
        image={ASSETS.images.chickenRoastPolao}
        label="Roast Polao"
        tint="butter"
        selected={selected.includes('polao')}
        onPress={() => toggle('polao')}
      />
      <CategoryTile
        image={ASSETS.images.almonds}
        label="Almond Snacks"
        tint="mint"
        selected={selected.includes('almonds')}
        onPress={() => toggle('almonds')}
      />
      <CategoryTile
        image={ASSETS.illustrations.cookieDoughBowl}
        label="Dessert"
        tint="blush"
        selected={selected.includes('sweet')}
        onPress={() => toggle('sweet')}
      />
    </View>
  );
}

function TabBarDemo() {
  const [active, setActive] = useState('home');

  return (
    <View>
      <Text className="mb-sm font-sans text-xs text-text-muted">
        Active tab: {active}
      </Text>
      <TabBar activeKey={active} onChange={setActive} bottomInset={0} className="rounded-lg border border-border" />
    </View>
  );
}

export default function UiKitScreen() {
  return (
    <Screen scroll variant="plain">
      <View className="mb-xl mt-md">
        <Text className="font-display text-hero text-text-primary">Whatcha Got?</Text>
        <Text className="mt-xs font-sans text-sm text-text-secondary">
          UI Kit · Phase 1 — every component and state in one place.
        </Text>
        <Text className="mt-xs font-sans text-xs text-text-muted">
          Press and hold controls to see pressed states. Tap fields to see focus states.
        </Text>
      </View>

      <Section title="Backgrounds" hint="<Screen variant=... /> pastel gradients">
        {Object.entries(gradients).map(([name, gradient]) => (
          <View
            key={name}
            className="overflow-hidden rounded-md border border-border"
          >
            <LinearGradient
              colors={gradient.colors}
              locations={gradient.locations}
              start={gradient.start}
              end={gradient.end}
              style={StyleSheet.absoluteFill}
            />
            <View className="h-14 flex-row items-center justify-between px-md">
              <Text className="font-sans-medium text-sm capitalize text-text-primary">
                {name}
              </Text>
              <Text className="font-sans text-xs text-text-secondary">
                variant=&quot;{name}&quot;
              </Text>
            </View>
          </View>
        ))}
        <View className="h-14 flex-row items-center justify-between rounded-md border border-border bg-background px-md">
          <Text className="font-sans-medium text-sm text-text-primary">Plain</Text>
          <Text className="font-sans text-xs text-text-secondary">
            variant=&quot;plain&quot;
          </Text>
        </View>
      </Section>

      <Section title="Buttons" hint="primary · secondary · ghost · google · disabled · loading">
        <Button title="Get Started" onPress={() => {}} fullWidth />
        <Button title="Secondary" variant="secondary" onPress={() => {}} fullWidth />
        <Button title="Ghost action" variant="ghost" onPress={() => {}} fullWidth />
        <Button title="Continue with Google" variant="google" onPress={() => {}} fullWidth />
        <Button
          title="Save Goal"
          onPress={() => {}}
          fullWidth
          icon={<Ionicons name="checkmark" size={20} color={colors.textInverse} />}
        />
        <Button title="Disabled" onPress={() => {}} disabled fullWidth />
        <Button title="Saving…" onPress={() => {}} loading fullWidth />
        <View className="mt-xs flex-row items-center justify-center gap-sm">
          <Button title="Small" size="sm" onPress={() => {}} />
          <Button title="Compact" onPress={() => {}} />
        </View>
      </Section>

      <Section title="Inputs" hint="Persistent labels · default / filled / password / error / disabled">
        <InputsDemo />
      </Section>

      <Section title="OTP" hint="5 boxes · auto-advance · backspace · paste · error">
        <OtpDemo />
      </Section>

      <Section title="Feedback" hint="success · error + retry · offline · info">
        <ToastDemo />
      </Section>

      <Section title="Empty state" hint="illustration + title + subtitle + CTAs">
        <Card padding="none" className="overflow-hidden">
          <EmptyState
            title="My Yum List"
            subtitle="Save recipes you love and they will show up here, ready for the next shop."
            actionLabel="Explore recipes"
            onAction={() => {}}
            secondaryActionLabel="Add a recipe"
            onSecondaryAction={() => {}}
          />
        </Card>
      </Section>

      <Section title="Skeleton" hint="Pulsing loading placeholder">
        <Card>
          <View className="flex-row items-center gap-sm">
            <Skeleton width={48} height={48} rounded="full" />
            <View className="flex-1 gap-xs">
              <Skeleton width="60%" height={14} />
              <Skeleton width="40%" height={12} />
            </View>
          </View>
          <View className="mt-md gap-xs">
            <Skeleton height={12} />
            <Skeleton width="85%" height={12} />
            <Skeleton width="70%" height={12} />
          </View>
        </Card>
      </Section>

      <Section title="Chips" hint="Multi-select · controlled by the parent">
        <ChipsDemo />
      </Section>

      <Section title="Category tiles" hint="Image + label · multi-select · selected check">
        <TilesDemo />
      </Section>

      <Section title="Cards" hint="Surface and pastel variants · token radius and shadow">
        <View className="flex-row flex-wrap gap-sm">
          {[
            { variant: 'surface', label: 'Surface' },
            { variant: 'blush', label: 'Blush' },
            { variant: 'mint', label: 'Mint' },
            { variant: 'butter', label: 'Butter' },
          ].map((item) => (
            <Card key={item.variant} variant={item.variant} className="w-[47%]">
              <Text className="font-sans-semibold text-sm text-text-primary">
                {item.label}
              </Text>
              <Text className="mt-xs font-sans text-xs text-text-secondary">
                Card variant
              </Text>
            </Card>
          ))}
        </View>
        <Card onPress={() => {}} elevation="md" className="mt-sm">
          <Text className="font-sans-semibold text-md text-text-primary">
            Pressable card
          </Text>
          <Text className="mt-xs font-sans text-sm text-text-secondary">
            Use this for recipe rows and settings blocks.
          </Text>
        </Card>
      </Section>

      <Section title="Tab bar" hint="Home · Calorie · List · Favorites · Profile">
        <TabBarDemo />
      </Section>

      <Text className="mb-xl text-center font-sans text-xs text-text-muted">
        Delete app/_dev once the designed screens consume these components.
      </Text>
    </Screen>
  );
}
