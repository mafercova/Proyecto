import AsyncStorage from '@react-native-async-storage/async-storage';

export const PROGRESS_STORAGE_KEY = '@physicslab/progress';

const DEFAULT_PROGRESS = {
  quiz: {
    bestScore: null,
    bestPercentage: null,
    lastScore: null,
    lastPercentage: null,
    attempts: 0,
  },
  experiments: {
    balance: false,
    acceleration: false,
    rotation: false,
    'magnetic-field': false,
  },
};

export function createDefaultProgress() {
  return {
    quiz: { ...DEFAULT_PROGRESS.quiz },
    experiments: { ...DEFAULT_PROGRESS.experiments },
  };
}

function normalizeProgress(value) {
  const storedQuiz = value?.quiz || {};
  const storedExperiments = value?.experiments || {};
  const validScore = (score) => (Number.isInteger(score) && score >= 0 ? score : null);
  const validPercentage = (percentage) =>
    (Number.isFinite(percentage) && percentage >= 0 && percentage <= 100 ? percentage : null);
  const validAttempts =
    Number.isInteger(storedQuiz.attempts) && storedQuiz.attempts >= 0
      ? storedQuiz.attempts
      : 0;

  return {
    quiz: {
      bestScore: validScore(storedQuiz.bestScore),
      bestPercentage: validPercentage(storedQuiz.bestPercentage),
      lastScore: validScore(storedQuiz.lastScore),
      lastPercentage: validPercentage(storedQuiz.lastPercentage),
      attempts: validAttempts,
    },
    experiments: {
      balance: storedExperiments.balance === true,
      acceleration: storedExperiments.acceleration === true,
      rotation: storedExperiments.rotation === true,
      'magnetic-field': storedExperiments['magnetic-field'] === true,
    },
  };
}

export async function getProgress() {
  try {
    const storedProgress = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
    return storedProgress ? normalizeProgress(JSON.parse(storedProgress)) : createDefaultProgress();
  } catch {
    return createDefaultProgress();
  }
}

export async function saveQuizResult(score, percentage) {
  const currentProgress = await getProgress();
  const currentBest = currentProgress.quiz.bestScore;
  const isNewBest = currentBest === null || score > currentBest;
  const nextProgress = {
    ...currentProgress,
    quiz: {
      ...currentProgress.quiz,
      bestScore: isNewBest ? score : currentProgress.quiz.bestScore,
      bestPercentage: isNewBest ? percentage : currentProgress.quiz.bestPercentage,
      lastScore: score,
      lastPercentage: percentage,
      attempts: currentProgress.quiz.attempts + 1,
    },
  };

  try {
    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(nextProgress));
    return nextProgress;
  } catch {
    return currentProgress;
  }
}

export async function markExperimentCompleted(experimentId) {
  const currentProgress = await getProgress();

  if (!(experimentId in currentProgress.experiments)) {
    return currentProgress;
  }

  const nextProgress = {
    ...currentProgress,
    experiments: {
      ...currentProgress.experiments,
      [experimentId]: true,
    },
  };

  try {
    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(nextProgress));
    return nextProgress;
  } catch {
    return currentProgress;
  }
}

export async function resetProgress() {
  const defaultProgress = createDefaultProgress();

  try {
    await AsyncStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch {
    try {
      await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(defaultProgress));
    } catch {}
  }

  return defaultProgress;
}
