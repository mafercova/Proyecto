import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../../constants/theme';
import SimpleCar from '../SimpleCar';
import SimulationControls from './SimulationControls';

export default function MovementSimulation() {
  const [progress] = useState(() => new Animated.Value(0));
  const [trackWidth, setTrackWidth] = useState(0);
  const [position, setPosition] = useState(0);
  const [running, setRunning] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    const listener = progress.addListener(({ value }) => setPosition(Math.round(value * 100)));
    return () => {
      progress.removeListener(listener);
      animation.current?.stop();
    };
  }, [progress]);

  const start = () => {
    setRunning(true);
    animation.current = Animated.timing(progress, {
      duration: 4000,
      toValue: 1,
      useNativeDriver: true,
    });
    animation.current.start(({ finished }) => {
      if (finished) setRunning(false);
    });
  };

  const pause = () => {
    animation.current?.stop();
    setRunning(false);
  };

  const reset = () => {
    animation.current?.stop();
    progress.setValue(0);
    setPosition(0);
    setRunning(false);
  };

  return (
    <View>
      <Text style={styles.intro}>Observa cómo un objeto cambia de posición entre dos puntos.</Text>
      <View onLayout={({ nativeEvent }) => setTrackWidth(nativeEvent.layout.width)} style={styles.scene}>
        <View style={styles.track} />
        <View style={styles.pointA}><Text style={styles.pointText}>A</Text></View>
        <View style={[styles.pointB, { left: Math.max(trackWidth - 28, 0) }]}><Text style={styles.pointText}>B</Text></View>
        <Animated.View style={[styles.object, { transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, Math.max(trackWidth - 122, 0)] }) }] }]}>
          <SimpleCar />
        </Animated.View>
      </View>
      <View style={styles.values}>
        <Text style={styles.value}>Posición inicial: 0 m</Text>
        <Text style={styles.value}>Posición actual: {position} m</Text>
        <Text style={styles.value}>Posición final: 100 m</Text>
      </View>
      <Text style={styles.explanation}>Existe movimiento cuando un objeto cambia su posición respecto a un punto de referencia con el paso del tiempo.</Text>
      <SimulationControls onPause={pause} onReset={reset} onStart={start} running={running} />
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21 },
  scene: { backgroundColor: colors.primarySoft, borderRadius: radii.md, height: 110, justifyContent: 'center', marginTop: spacing.md, overflow: 'hidden' },
  track: { backgroundColor: colors.primary, height: 3, left: 24, position: 'absolute', right: 24 },
  pointA: { alignItems: 'center', backgroundColor: colors.primaryDark, borderRadius: 14, height: 28, justifyContent: 'center', left: 14, position: 'absolute', width: 28 },
  pointB: { alignItems: 'center', backgroundColor: colors.primaryDark, borderRadius: 14, height: 28, justifyContent: 'center', position: 'absolute', width: 28 },
  pointText: { color: colors.textOnPrimary, fontSize: typography.caption, fontWeight: '800' },
  object: { height: 52, left: 20, position: 'absolute', width: 84 },
  values: { gap: spacing.xs, marginTop: spacing.md },
  value: { color: colors.text, fontSize: typography.caption, fontWeight: '700' },
  explanation: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21, marginTop: spacing.md },
});
