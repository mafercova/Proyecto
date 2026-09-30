import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  createDefaultProgress,
  getProgress,
  markExperimentCompleted,
  resetProgress as clearStoredProgress,
} from '../utils/storage';

export default function useProgress() {
  const [progress, setProgress] = useState(createDefaultProgress);

  const refresh = useCallback(async () => {
    const nextProgress = await getProgress();
    setProgress(nextProgress);
    return nextProgress;
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      getProgress().then((nextProgress) => {
        if (isActive) setProgress(nextProgress);
      });

      return () => {
        isActive = false;
      };
    }, [])
  );

  const completeExperiment = useCallback(async (experimentId) => {
    const nextProgress = await markExperimentCompleted(experimentId);
    setProgress(nextProgress);
    return nextProgress;
  }, []);

  const clearProgress = useCallback(async () => {
    const nextProgress = await clearStoredProgress();
    setProgress(nextProgress);
    return nextProgress;
  }, []);

  return { progress, refresh, completeExperiment, clearProgress };
}
