import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../../constants/theme';
import SimpleCar from '../SimpleCar';
import SimulationControls from './SimulationControls';

export default function AccelerationSimulation() {
  const [progress] = useState(() => new Animated.Value(0));
  const [trackWidth, setTrackWidth] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    const listener = progress.addListener(({ value }) => setSpeed(value < 0.34 ? 2 : value < 0.67 ? 4 : 6));
    return () => {
      progress.removeListener(listener);
      animation.current?.stop();
    };
  }, [progress]);

  const start = () => {
    setRunning(true);
    setFinished(false);
    animation.current = Animated.timing(progress, { duration: 5000, easing: Easing.in(Easing.quad), toValue: 1, useNativeDriver: true });
    animation.current.start(({ finished: completed }) => { if (completed) { setRunning(false); setFinished(true); } });
  };
  const pause = () => { animation.current?.stop(); setRunning(false); };
  const reset = () => { animation.current?.stop(); progress.setValue(0); setSpeed(2); setFinished(false); setRunning(false); };

  return (
    <View>
      <Text style={styles.intro}>El automóvil empieza despacio y aumenta su velocidad con el tiempo.</Text>
      <View onLayout={({ nativeEvent }) => setTrackWidth(nativeEvent.layout.width)} style={styles.scene}>
        <View style={styles.road} />
        <Animated.View style={[styles.car, { transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, Math.max(trackWidth - 122, 0)] }) }] }]}>
          <SimpleCar wheelRotation={progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '720deg'] })} />
        </Animated.View>
      </View>
      <View style={styles.values}>
        <Text style={styles.value}>Velocidad: {speed} m/s</Text>
        <Text style={styles.formula}>a = Δv / Δt</Text>
        <Text style={styles.status}>{finished ? 'Como la velocidad aumentó con el tiempo, hubo aceleración.' : 'La velocidad está aumentando.'}</Text>
      </View>
      <Text style={styles.explanation}>Existe aceleración porque la velocidad cambia con el tiempo.</Text>
      <SimulationControls onPause={pause} onReset={reset} onStart={start} running={running} />
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21 },
  scene: { backgroundColor: colors.primarySoft, borderRadius: radii.md, height: 120, justifyContent: 'center', marginTop: spacing.md, overflow: 'hidden' },
  road: { backgroundColor: colors.textSecondary, bottom: 25, height: 3, left: 18, position: 'absolute', right: 18 },
  car: { height: 52, left: 20, position: 'absolute', width: 84 },
  values: { gap: spacing.xs, marginTop: spacing.md },
  value: { color: colors.text, fontSize: typography.caption, fontWeight: '700' },
  formula: { color: colors.primaryDark, fontSize: typography.body, fontWeight: '800' },
  status: { color: colors.accent, fontSize: typography.caption, fontWeight: '700', lineHeight: 19 },
  explanation: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21, marginTop: spacing.md },
});
