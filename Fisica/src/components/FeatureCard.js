import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../constants/theme';

export default function FeatureCard({ icon, title, description, onPress }) {
  const content = (
    <>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.card}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    flexDirection: 'row',
    marginBottom: spacing.sm,
    padding: spacing.md,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.78,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: colors.infoSoft,
    borderRadius: radii.md,
    height: 48,
    justifyContent: 'center',
    marginRight: spacing.md,
    width: 48,
  },
  icon: {
    color: colors.info,
    fontSize: 22,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    lineHeight: 18,
  },
});
