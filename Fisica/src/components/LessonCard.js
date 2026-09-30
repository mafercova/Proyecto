import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../constants/theme';

export default function LessonCard({ lesson, onPress }) {
  return (
    <Pressable
      accessibilityHint="Abre el detalle de la lección"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.numberBadge}>
        <Text style={styles.number}>{lesson.title.charAt(0)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description}>{lesson.shortDescription}</Text>
        <Text style={styles.action}>Ver lección  ›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.78,
  },
  numberBadge: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.sm,
    height: 42,
    justifyContent: 'center',
    marginRight: spacing.md,
    width: 42,
  },
  number: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '700',
    marginBottom: 5,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 21,
  },
  action: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
});
