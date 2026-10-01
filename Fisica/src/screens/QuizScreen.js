import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import QuizOption from '../components/QuizOption';
import QuizResultModal from '../components/QuizResultModal';
import { colors, radii, shadows, spacing, typography } from '../constants/theme';
import questions from '../data/questions';
import useProgress from '../hooks/useProgress';
import { saveQuizResult } from '../utils/storage';

const TOPICS = 'Movimiento, sensores, gravedad, rotación y magnetismo';

export default function QuizScreen() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { progress, refresh } = useProgress();

  const currentQuestion = questions[currentIndex];
  const percentage = Math.round((correctAnswers / questions.length) * 100);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setShowResult(false);
  };

  const startQuiz = () => {
    resetQuiz();
    setIsStarted(true);
  };

  const finishQuiz = () => {
    resetQuiz();
    setIsStarted(false);
  };

  const confirmAnswer = () => {
    if (selectedAnswer === null || feedback) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setFeedback({ isCorrect });
    if (isCorrect) setCorrectAnswers((score) => score + 1);
    else setIncorrectAnswers((score) => score + 1);
  };

  const goToNextQuestion = () => {
    if (!feedback) return;

    if (currentIndex === questions.length - 1) {
      finishAttempt();
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const finishAttempt = async () => {
    const finalPercentage = Math.round((correctAnswers / questions.length) * 100);
    await saveQuizResult(correctAnswers, finalPercentage);
    await refresh();
    setIsStarted(false);
    setShowResult(true);
  };

  if (!isStarted) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.startContent} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>RETO DE APRENDIZAJE</Text>
            <Text style={styles.title}>Quiz de Física</Text>
            <Text style={styles.description}>Pon a prueba lo que aprendiste en PhysicsLab.</Text>
          </View>
          <View style={styles.infoCard}>
            <InfoRow label="Preguntas" value={`${questions.length}`} />
            <InfoRow label="Temas" value={TOPICS} />
            <InfoRow label="Duración estimada" value="5 minutos" />
          </View>
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>Tu progreso</Text>
            {progress.quiz.attempts > 0 ? (
              <>
                <InfoRow
                  label="Mejor puntuación"
                  value={`${progress.quiz.bestScore}/${questions.length}`}
                />
                <InfoRow label="Mejor resultado" value={`${progress.quiz.bestPercentage}%`} />
                <InfoRow label="Intentos realizados" value={`${progress.quiz.attempts}`} />
                <InfoRow
                  label="Último resultado"
                  value={`${progress.quiz.lastScore}/${questions.length}`}
                />
              </>
            ) : (
              <Text style={styles.emptyProgress}>Aún no has completado ningún quiz.</Text>
            )}
          </View>
          <Text style={styles.startHint}>
            Lee cada pregunta, selecciona una opción y confirma tu respuesta para recibir una explicación.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={startQuiz}
            style={({ pressed }) => [styles.startButton, pressed && styles.pressed]}
          >
            <Text style={styles.startButtonText}>Comenzar Quiz</Text>
          </Pressable>
        </ScrollView>
        <QuizResultModal
          correctAnswers={correctAnswers}
          onFinish={finishQuiz}
          onRepeat={startQuiz}
          percentage={percentage}
          totalQuestions={questions.length}
          visible={showResult}
        />
      </View>
    );
  }

  const progressWidth = ((currentIndex + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.quizContent} showsVerticalScrollIndicator={false}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            Pregunta {currentIndex + 1} de {questions.length}
          </Text>
          <Text style={styles.scoreLabel}>
            Aciertos: {correctAnswers} · Errores: {incorrectAnswers}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressWidth}%` }]} />
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>PREGUNTA {currentIndex + 1}</Text>
          <Text style={styles.question}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <QuizOption
              correct={Boolean(feedback) && index === currentQuestion.correctAnswer}
              disabled={Boolean(feedback)}
              incorrect={Boolean(feedback) && selectedAnswer === index && index !== currentQuestion.correctAnswer}
              key={option}
              onPress={() => setSelectedAnswer(index)}
              selected={selectedAnswer === index}
              text={option}
            />
          ))}
        </View>

        {feedback ? (
          <View style={[styles.feedbackCard, feedback.isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
            <Text style={styles.feedbackTitle}>{feedback.isCorrect ? '✓ ¡Correcto!' : '✕ Respuesta incorrecta'}</Text>
            <Text style={styles.feedbackText}>
              {feedback.isCorrect
                ? currentQuestion.explanation
                : `La respuesta correcta es: ${currentQuestion.options[currentQuestion.correctAnswer]}. ${currentQuestion.explanation}`}
            </Text>
          </View>
        ) : null}

        {!feedback ? (
          <Pressable
            accessibilityRole="button"
            disabled={selectedAnswer === null}
            onPress={confirmAnswer}
            style={({ pressed }) => [styles.actionButton, selectedAnswer === null && styles.disabledButton, pressed && styles.pressed]}
          >
            <Text style={styles.actionButtonText}>Confirmar respuesta</Text>
          </Pressable>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={goToNextQuestion}
            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
          >
            <Text style={styles.actionButtonText}>
              {currentIndex === questions.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  startContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  quizContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  hero: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
    borderRadius: radii.lg,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  eyebrow: {
    color: colors.primaryOnDark,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.textOnPrimary,
    fontSize: typography.title,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.primarySoft,
    fontSize: typography.body,
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    ...shadows.card,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  progressTitle: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  emptyProgress: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  infoRow: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: spacing.sm,
  },
  infoRowLast: {},
  infoLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginBottom: 3,
  },
  infoValue: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '600',
    lineHeight: 21,
  },
  startHint: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    minHeight: 52,
    justifyContent: 'center',
  },
  startButtonText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
  },
  scoreLabel: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  progressTrack: {
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: 8,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    height: '100%',
  },
  questionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    ...shadows.card,
  },
  questionNumber: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  question: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 29,
  },
  optionsContainer: {
    marginBottom: spacing.sm,
  },
  feedbackCard: {
    borderRadius: radii.md,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  correctFeedback: {
    backgroundColor: colors.successSoft,
    borderColor: colors.successBorder,
    borderWidth: 1,
  },
  incorrectFeedback: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.dangerBorder,
    borderWidth: 1,
  },
  feedbackTitle: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  feedbackText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    minHeight: 50,
    justifyContent: 'center',
    marginTop: spacing.sm,
    ...shadows.card,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  actionButtonText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
});
