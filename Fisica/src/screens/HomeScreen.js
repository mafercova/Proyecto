import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import FeatureCard from '../components/FeatureCard';
import ProgressResetModal from '../components/ProgressResetModal';
import { colors, radii, shadows, spacing, typography } from '../constants/theme';
import useProgress from '../hooks/useProgress';

const features = [
  {
    icon: '≡',
    title: 'Lecciones',
    description: 'Aprende conceptos fundamentales de física.',
  },
  {
    icon: '◉',
    title: 'Laboratorio',
    description: 'Observa posteriormente datos reales de los sensores.',
  },
  {
    icon: '✦',
    title: 'Experimentos',
    description: 'Realiza actividades prácticas utilizando el teléfono.',
  },
  {
    icon: '?',
    title: 'Quiz',
    description: 'Pon a prueba los conocimientos adquiridos.',
  },
];

const topics = ['Movimiento', 'Aceleración', 'Gravedad', 'Rotación', 'Magnetismo'];

export default function HomeScreen() {
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const { progress, clearProgress } = useProgress();
  const completedExperiments = Object.values(progress.experiments).filter(Boolean).length;
  const hasProgress = progress.quiz.attempts > 0 || completedExperiments > 0;

  const confirmReset = async () => {
    await clearProgress();
    setResetModalVisible(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.hero}>
        <Text style={styles.greeting}>EXPLORA LA FÍSICA</Text>
        <Text style={styles.title}>PhysicsLab</Text>
        <Text style={styles.description}>
          Aprende física experimentando con los sensores de tu dispositivo.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Todo en un solo lugar</Text>
      <View>
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </View>

      <View style={styles.learningSection}>
        <Text style={styles.sectionTitle}>¿Qué aprenderás?</Text>
        <View style={styles.topicList}>
          {topics.map((topic) => (
            <View key={topic} style={styles.topicPill}>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeading}>
          <Text style={styles.sectionTitle}>Mi progreso</Text>
          <Text style={styles.progressCount}>{completedExperiments}/4</Text>
        </View>
        {hasProgress ? (
          <View style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Experimentos</Text>
              <Text style={styles.progressValue}>{completedExperiments} de 4 completados</Text>
            </View>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Quiz</Text>
              <Text style={styles.progressValue}>
                Mejor resultado: {progress.quiz.bestPercentage === null ? 'Sin intentos' : `${progress.quiz.bestPercentage}%`}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.progressCard}>
            <Text style={styles.emptyProgress}>Comienza una actividad para registrar tu progreso.</Text>
          </View>
        )}
        <Pressable
          accessibilityRole="button"
          onPress={() => setResetModalVisible(true)}
          style={({ pressed }) => [styles.resetButton, pressed && styles.resetPressed]}
        >
          <Text style={styles.resetText}>Reiniciar progreso</Text>
        </Pressable>
      </View>

      <ProgressResetModal
        onCancel={() => setResetModalVisible(false)}
        onConfirm={confirmReset}
        visible={resetModalVisible}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    marginBottom: spacing.xl,
    padding: spacing.lg,
    ...shadows.floating,
  },
  greeting: {
    color: colors.primaryOnDark,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.textOnPrimary,
    fontSize: typography.display,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.primarySoft,
    fontSize: typography.body,
    lineHeight: 22,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  learningSection: {
    marginTop: spacing.lg,
  },
  progressSection: {
    marginTop: spacing.xl,
  },
  progressHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressCount: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: spacing.md,
    ...shadows.card,
  },
  progressRow: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: spacing.sm,
  },
  progressLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginBottom: 3,
  },
  progressValue: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
  },
  emptyProgress: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  resetButton: {
    alignItems: 'center',
    borderColor: colors.dangerBorder,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: spacing.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  resetPressed: {
    backgroundColor: colors.primarySoft,
  },
  resetText: {
    color: colors.danger,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  topicList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  topicPill: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  topicText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    fontWeight: '600',
  },
});
