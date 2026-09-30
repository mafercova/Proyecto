import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../constants/theme';

export default function ProgressResetModal({ visible, onCancel, onConfirm }) {
  return (
    <Modal animationType="fade" onRequestClose={onCancel} transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>¿Reiniciar progreso?</Text>
          <Text style={styles.description}>Se eliminarán:</Text>
          <Text style={styles.item}>• Resultados del quiz</Text>
          <Text style={styles.item}>• Experimentos completados</Text>
          <Text style={styles.warning}>Esta acción no se puede deshacer.</Text>
          <View style={styles.actions}>
            <Pressable accessibilityRole="button" onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onConfirm}
              style={({ pressed }) => [styles.confirmButton, pressed && styles.pressed]}
            >
              <Text style={styles.confirmText}>Reiniciar</Text>
            </Pressable>
          </View>
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
  title: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginBottom: spacing.xs,
  },
  item: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 23,
  },
  warning: {
    color: colors.warningDark,
    fontSize: typography.caption,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  cancelButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  confirmButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  confirmText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
});
