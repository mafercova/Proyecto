import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../constants/theme';

const instructions = {
  accelerometer: {
    title: 'Probar el acelerómetro',
    body: 'Mueve o inclina lentamente el teléfono y observa cómo cambian los valores X, Y y Z.',
  },
  gyroscope: {
    title: 'Probar el giroscopio',
    body: 'Gira lentamente el teléfono alrededor de diferentes ejes y observa la velocidad de rotación.',
  },
  magnetometer: {
    title: 'Probar el magnetómetro',
    body: 'Acerca cuidadosamente el teléfono a un objeto metálico o a un imán pequeño y observa los cambios en el campo magnético.',
    warning: 'No acerques imanes muy fuertes al dispositivo.',
  },
};

export default function SensorHelpModal({ sensor, visible, onClose }) {
  const content = instructions[sensor];

  if (!content) return null;

  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.eyebrow}>GUÍA RÁPIDA</Text>
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.body}>{content.body}</Text>
            {content.warning ? (
              <View style={styles.warningBox}>
                <Text style={styles.warning}>{content.warning}</Text>
              </View>
            ) : null}
            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
            >
              <Text style={styles.closeText}>Entendido</Text>
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
    maxHeight: '70%',
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
    marginBottom: spacing.md,
  },
  body: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 23,
    marginBottom: spacing.md,
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
    fontSize: typography.body,
    fontWeight: '600',
    lineHeight: 21,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    minHeight: 48,
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  closeText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
});
