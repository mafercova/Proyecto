import { useEffect, useState } from 'react';
import { Gyroscope } from 'expo-sensors';

import { normalizeSensorData } from '../utils/sensorData';

const UPDATE_INTERVAL = 150;
const INITIAL_DATA = { x: 0, y: 0, z: 0 };

export default function useGyroscope({ enabled = true, paused = false } = {}) {
  const [data, setData] = useState(INITIAL_DATA);
  const [isAvailable, setIsAvailable] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let subscription;

    if (!enabled) {
      return undefined;
    }

    const subscribe = async () => {
      try {
        const available = await Gyroscope.isAvailableAsync();

        if (!isMounted) return;

        setIsAvailable(available);

        if (available && !paused) {
          Gyroscope.setUpdateInterval(UPDATE_INTERVAL);
           subscription = Gyroscope.addListener((nextData) => {
             setData(normalizeSensorData(nextData));
           });
        }
      } catch {
        if (isMounted) setIsAvailable(false);
      }
    };

    subscribe();

    return () => {
      isMounted = false;
      subscription?.remove();
    };
  }, [enabled, paused]);

  return { data, isAvailable };
}
