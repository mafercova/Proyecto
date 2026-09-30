import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../../constants/theme';
import SimpleBall from '../SimpleBall';
import SimulationControls from './SimulationControls';

export default function GravitySimulation() {
  const [progress] = useState(() => new Animated.Value(0));
  const [dropHeight, setDropHeight] = useState(0);
  const [reading, setReading] = useState({ height: 10, time: 0, speed: 0 });
  const [running, setRunning] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    const listener = progress.addListener(({ value }) => {
      const time = value * 1.4;
      setReading({ height: Number((10 - value * 10).toFixed(1)), time: Number(time.toFixed(1)), speed: Number((9.8 * time).toFixed(1)) });
    });
    return () => {
      progress.removeListener(listener);
      animation.current?.stop();
    };
  }, [progress]);

  const start = () => {
    setRunning(true);
    animation.current = Animated.timing(progress, { duration: 3000, easing: Easing.in(Easing.quad), toValue: 1, useNativeDriver: true });
    animation.current.start(({ finished }) => { if (finished) setRunning(false); });
  };
  const pause = () => { animation.current?.stop(); setRunning(false); };
  const reset = () => { animation.current?.stop(); progress.setValue(0); setReading({ height: 10, time: 0, speed: 0 }); setRunning(false); };

  return (
    <View>
      <Text style={styles.intro}>Suelta una pelota y observa cómo su velocidad aumenta durante la caída.</Text>
      <View onLayout={({ nativeEvent }) => setDropHeight(nativeEvent.layout.height)} style={styles.scene}>
        <View style={styles.ground} />
        <Animated.View style={[styles.ball, { transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, Math.max(dropHeight - 66, 0)] }) }] }]}>
          <SimpleBall />
        </Animated.View>
        <Text style={styles.gravityArrow}>↓ gravedad</Text>
      </View>
      <View style={styles.values}>
        <Text style={styles.value}>Altura: {reading.height} m</Text>
        <Text style={styles.value}>Tiempo aproximado: {reading.time.toFixed(1)} s</Text>
        <Text style={styles.value}>Velocidad: {reading.speed.toFixed(1)} m/s y aumentando</Text>
      </View>
      <Text style={styles.explanation}>La gravedad produce una aceleración aproximada de 9.8 m/s² hacia abajo. No se considera resistencia del aire.</Text>
      <SimulationControls onPause={pause} onReset={reset} onStart={start} running={running} />
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21 },
  scene: { backgroundColor: colors.primarySoft, borderRadius: radii.md, height: 230, marginTop: spacing.md, overflow: 'hidden' },
  ground: { backgroundColor: colors.success, bottom: 20, height: 8, left: 0, position: 'absolute', right: 0 },
  ball: { height: 38, left: '50%', marginLeft: -19, position: 'absolute', top: 12, width: 38 },
  gravityArrow: { color: colors.primaryDark, fontSize: typography.body, fontWeight: '800', position: 'absolute', right: 14, top: 18 },
  values: { gap: spacing.xs, marginTop: spacing.md },
  value: { color: colors.text, fontSize: typography.caption, fontWeight: '700' },
  explanation: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21, marginTop: spacing.md },
});
