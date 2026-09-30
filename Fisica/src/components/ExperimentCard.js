import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../constants/theme';

export default function ExperimentCard({ experiment, completed = false, onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{experiment.sensorType === 'gyroscope' ? '↻' : '◉'}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{experiment.title}</Text>
        <Text style={styles.description}>{experiment.description}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.sensor}>{experiment.sensor}</Text>
          <Text style={[styles.level, completed && styles.completed]}>
            {completed ? '✓ Completado' : 'Pendiente'}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Comenzar</Text>
        </Pressable>
      </View>
    </View>
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
  iconContainer: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.sm,
    height: 44,
    justifyContent: 'center',
    marginRight: spacing.md,
    width: 44,
  },
  icon: {
    color: colors.primaryDark,
    fontSize: 23,
  },
  content: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  sensor: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  level: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  completed: {
    color: colors.successText,
    fontWeight: '700',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    marginTop: spacing.md,
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontSize: typography.caption,
    fontWeight: '700',
  },
});
