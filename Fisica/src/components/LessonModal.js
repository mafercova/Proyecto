import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../constants/theme';
import RealLifeExample from './RealLifeExample';

export default function LessonModal({ lesson, visible, onClose, onOpenSimulation }) {
  if (!lesson) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.eyebrow}>LECCIÓN</Text>
            <Text style={styles.title}>{lesson.title}</Text>

            <Text style={styles.label}>Definición</Text>
            <Text style={styles.body}>{lesson.definition}</Text>

            <Text style={styles.label}>Ejemplo</Text>
            <Text style={styles.body}>{lesson.example}</Text>

            {lesson.formula ? (
              <View style={styles.formulaBox}>
                <Text style={styles.label}>Fórmula</Text>
                <Text style={styles.formula}>{lesson.formula}</Text>
              </View>
            ) : null}

            <RealLifeExample title="En la vida real" text={lesson.realLifeExample} icon="◉" />

            {lesson.simulation ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => onOpenSimulation(lesson)}
                style={({ pressed }) => [styles.simulationButton, pressed && styles.simulationPressed]}
              >
                <Text style={styles.simulationText}>Ver simulación</Text>
              </Pressable>
            ) : null}

            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
            >
              <Text style={styles.closeText}>Cerrar</Text>
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
    maxHeight: '86%',
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
    lineHeight: 23,
    marginBottom: spacing.lg,
  },
  formulaBox: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.infoBorder,
    borderRadius: radii.sm,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  formula: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    minHeight: 48,
    justifyContent: 'center',
    ...shadows.card,
  },
  simulationButton: {
    alignItems: 'center',
    borderColor: colors.primary,
    borderRadius: radii.sm,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    minHeight: 48,
  },
  simulationPressed: {
    backgroundColor: colors.primarySoft,
  },
  simulationText: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: '700',
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
