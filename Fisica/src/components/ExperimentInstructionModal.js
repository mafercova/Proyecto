import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../constants/theme';

export default function ExperimentInstructionModal({ experiment, visible, onStart, onCancel }) {
  if (!experiment) return null;

  return (
    <Modal animationType="fade" onRequestClose={onCancel} transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.eyebrow}>NUEVO EXPERIMENTO</Text>
            <Text style={styles.title}>{experiment.title}</Text>

            <Text style={styles.label}>Objetivo</Text>
            <Text style={styles.body}>{experiment.objective}</Text>

            <Text style={styles.label}>Instrucciones</Text>
            <Text style={styles.body}>{experiment.instructions}</Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Sensor utilizado</Text>
              <Text style={styles.infoText}>{experiment.sensor}</Text>
            </View>

            <View style={styles.warningBox}>
              <Text style={styles.warning}>{experiment.safety}</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={onStart}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
            >
              <Text style={styles.primaryText}>Comenzar experimento</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    borderWidth: 1,
    maxHeight: '90%',
    ...shadows.floating,
  },
  content: {
    padding: spacing.lg,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  body: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  infoBox: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.infoBorder,
    borderRadius: radii.sm,
    borderWidth: 1,
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginBottom: 2,
  },
  infoText: {
    color: colors.primaryDark,
    fontSize: typography.body,
    fontWeight: '700',
  },
  warningBox: {
    backgroundColor: colors.warningSoft,
    borderColor: colors.warningBorder,
    borderRadius: radii.sm,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  warning: {
    color: colors.warningText,
    fontSize: typography.caption,
    lineHeight: 19,
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
  cancelButton: {
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  cancelText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    fontWeight: '600',
  },
});
