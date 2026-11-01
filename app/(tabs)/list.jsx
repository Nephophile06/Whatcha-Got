import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Screen, Input, Button, Card } from '../../src/components/ui';
import { EmptyState } from '../../src/components/feature';
import { useGroceryStore } from '../../src/store/groceryStore';
import { colors, radius, spacing, typography } from '../../src/theme/tokens';

export default function GroceryListScreen() {
  const { items, addItem, toggleItem, removeItem, clearCompleted } = useGroceryStore();
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');

  const completedCount = items.filter((i) => i.checked).length;

  const handleAdd = () => {
    if (!newItemName.trim()) return;
    addItem(newItemName.trim(), 'General', newItemQty.trim() || '1');
    setNewItemName('');
    setNewItemQty('');
  };

  return (
    <Screen scrollable style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Grocery List</Text>
          <Text style={styles.subtitle}>
            {items.length} items total • {completedCount} checked
          </Text>
        </View>
        {completedCount > 0 ? (
          <TouchableOpacity onPress={clearCompleted} style={styles.clearBtn}>
            <Text style={styles.clearText}>Clear Checked</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Quick Add Section */}
      <Card style={styles.addCard}>
        <Text style={styles.addSectionTitle}>Add Ingredient</Text>
        <View style={styles.inputRow}>
          <View style={{ flex: 2 }}>
            <Input
              label="Item Name"
              placeholder="e.g. Tomatoes"
              value={newItemName}
              onChangeText={setNewItemName}
              style={{ marginBottom: 0 }}
            />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Input
              label="Qty"
              placeholder="e.g. 500g"
              value={newItemQty}
              onChangeText={setNewItemQty}
              style={{ marginBottom: 0 }}
            />
          </View>
        </View>
        <Button
          title="+ Add to Grocery List"
          size="md"
          variant="primary"
          onPress={handleAdd}
          disabled={!newItemName.trim()}
          style={styles.addBtn}
        />
      </Card>

      {/* Items List */}
      <View style={styles.listSection}>
        {items.length === 0 ? (
          <EmptyState
            icon="🛒"
            title="Grocery list is empty"
            description="Add items directly or click 'Add to Grocery List' from any recipe."
            actionLabel="Add Milk"
            onAction={() => addItem('Milk (1 Liter)', 'Dairy')}
          />
        ) : (
          items.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => toggleItem(item.id)}
              style={[styles.itemCard, item.checked && styles.itemCardChecked]}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: item.checked }}
            >
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                  {item.checked ? <Text style={styles.checkmark}>✓</Text> : null}
                </View>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {item.quantity} • {item.category}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={styles.deleteBtn}
                accessibilityLabel="Delete item"
              >
                <Text style={styles.deleteIcon}>✕</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  clearBtn: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
  },
  clearText: {
    color: colors.error,
    fontWeight: '700',
    fontSize: typography.fontSize.xs,
  },
  addCard: {
    marginBottom: spacing.lg,
  },
  addSectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  addBtn: {
    marginTop: spacing.xs,
  },
  listSection: {
    marginBottom: spacing.xl,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemCardChecked: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.border,
    opacity: 0.75,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    backgroundColor: colors.surface,
  },
  checkboxChecked: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  checkmark: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: '800',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  itemMeta: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deleteBtn: {
    padding: spacing.xs,
  },
  deleteIcon: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '700',
  },
});

