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
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: spacing.md,
    ...shadows.card,
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
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    color: colors.textSecondary,
    fontSize: typography.caption,
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  completed: {
    backgroundColor: colors.successSoft,
    borderColor: colors.successBorder,
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
