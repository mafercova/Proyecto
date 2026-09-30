import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../constants/theme';

export default function ExperimentResultModal({ experiment, visible, onRepeat, onExit }) {
  if (!experiment) return null;

  return (
    <Modal animationType="fade" onRequestClose={onExit} transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.badge}>COMPLETADO</Text>
          <Text style={styles.title}>¡Experimento completado!</Text>
          <Text style={styles.resultTitle}>{experiment.resultTitle}</Text>
          <Text style={styles.body}>{experiment.resultDescription}</Text>
          <View style={styles.conceptBox}>
            <Text style={styles.conceptLabel}>Concepto observado</Text>
            <Text style={styles.conceptText}>{experiment.sensor}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onRepeat}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          >
            <Text style={styles.primaryText}>Repetir</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={onExit} style={styles.exitButton}>
            <Text style={styles.exitText}>Volver a experimentos</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    width: '100%',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentSoft,
    borderRadius: radii.pill,
    color: colors.successText,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  resultTitle: {
    color: colors.primary,
    fontSize: typography.cardTitle,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  body: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  conceptBox: {
    backgroundColor: colors.primarySoft,
    borderRadius: radii.sm,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  conceptLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginBottom: 2,
  },
  conceptText: {
    color: colors.primaryDark,
    fontSize: typography.body,
    fontWeight: '700',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    minHeight: 48,
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  primaryText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  exitButton: {
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  exitText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    fontWeight: '600',
  },
});
