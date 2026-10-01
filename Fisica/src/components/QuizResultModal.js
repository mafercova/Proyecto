import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../constants/theme';

function getPerformanceMessage(percentage) {
  if (percentage >= 90) return '¡Excelente! Dominas muy bien estos conceptos.';
  if (percentage >= 70) return '¡Muy bien! Tienes una buena comprensión de los temas.';
  if (percentage >= 50) return 'Buen intento. Repasa algunas lecciones y vuelve a intentarlo.';
  return 'Te recomendamos revisar las lecciones antes de intentarlo nuevamente.';
}

export default function QuizResultModal({
  correctAnswers,
  totalQuestions,
  percentage,
  visible,
  onRepeat,
  onFinish,
}) {
  return (
    <Modal animationType="fade" onRequestClose={onFinish} transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.badge}>RESULTADO</Text>
          <Text style={styles.title}>Quiz completado</Text>
          <Text style={styles.score}>
            {correctAnswers} / {totalQuestions}
          </Text>
          <Text style={styles.scoreLabel}>respuestas correctas</Text>
          <View style={styles.percentageBox}>
            <Text style={styles.percentage}>{percentage}%</Text>
          </View>
          <Text style={styles.message}>{getPerformanceMessage(percentage)}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={onRepeat}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          >
            <Text style={styles.primaryText}>Repetir Quiz</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={onFinish} style={styles.finishButton}>
            <Text style={styles.finishText}>Finalizar</Text>
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
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
    width: '100%',
    ...shadows.floating,
  },
  badge: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  score: {
    color: colors.primary,
    fontSize: 42,
    fontWeight: '800',
  },
  scoreLabel: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginBottom: spacing.md,
  },
  percentageBox: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.infoBorder,
    borderRadius: radii.pill,
    borderWidth: 1,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  percentage: {
    color: colors.primaryDark,
    fontSize: 20,
    fontWeight: '800',
  },
  message: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    minHeight: 48,
    justifyContent: 'center',
    width: '100%',
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  primaryText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  finishButton: {
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  finishText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    fontWeight: '600',
  },
});
