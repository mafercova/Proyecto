import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../../constants/theme';
import SimpleCar from '../SimpleCar';
import SimulationControls from './SimulationControls';

export default function VelocitySimulation() {
  const [progress] = useState(() => new Animated.Value(0));
  const [trackWidth, setTrackWidth] = useState(0);
  const [reading, setReading] = useState({ distance: 0, time: 0 });
  const [running, setRunning] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    const listener = progress.addListener(({ value }) => setReading({ distance: Math.round(value * 20), time: Number((value * 4).toFixed(1)) }));
    return () => {
      progress.removeListener(listener);
      animation.current?.stop();
    };
  }, [progress]);

  const start = () => {
    setRunning(true);
    animation.current = Animated.timing(progress, { duration: 4000, toValue: 1, useNativeDriver: true });
    animation.current.start(({ finished }) => { if (finished) setRunning(false); });
  };
  const pause = () => { animation.current?.stop(); setRunning(false); };
  const reset = () => { animation.current?.stop(); progress.setValue(0); setReading({ distance: 0, time: 0 }); setRunning(false); };

  return (
    <View>
      <Text style={styles.intro}>Un automóvil recorre 20 metros en 4 segundos a velocidad constante.</Text>
      <View onLayout={({ nativeEvent }) => setTrackWidth(nativeEvent.layout.width)} style={styles.scene}>
        <View style={styles.road} />
        <Animated.View style={[styles.car, { transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, Math.max(trackWidth - 122, 0)] }) }] }]}>
          <SimpleCar />
        </Animated.View>
        <Text style={styles.distanceLine}>20 m</Text>
      </View>
      <View style={styles.values}>
        <Text style={styles.value}>Distancia: {reading.distance} / 20 m</Text>
        <Text style={styles.value}>Tiempo: {reading.time.toFixed(1)} / 4 s</Text>
        <Text style={styles.formula}>v = d / t = 20 m / 4 s = 5 m/s</Text>
      </View>
      <Text style={styles.explanation}>La velocidad indica qué tan rápido cambia la posición de un objeto.</Text>
      <SimulationControls onPause={pause} onReset={reset} onStart={start} running={running} />
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21 },
  scene: { backgroundColor: colors.primarySoft, borderRadius: radii.md, height: 120, justifyContent: 'center', marginTop: spacing.md, overflow: 'hidden' },
  road: { backgroundColor: colors.textSecondary, bottom: 25, height: 3, left: 18, position: 'absolute', right: 18 },
  car: { height: 52, left: 20, position: 'absolute', width: 84 },
  distanceLine: { color: colors.primaryDark, fontSize: typography.caption, fontWeight: '800', position: 'absolute', right: 20, top: 18 },
  values: { gap: spacing.xs, marginTop: spacing.md },
  value: { color: colors.text, fontSize: typography.caption, fontWeight: '700' },
  formula: { color: colors.primaryDark, fontSize: typography.body, fontWeight: '800', marginTop: spacing.xs },
  explanation: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21, marginTop: spacing.md },
});
