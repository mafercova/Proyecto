import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../../constants/theme';
import SimpleWheel from '../SimpleWheel';
import SimulationControls from './SimulationControls';

export default function RotationSimulation() {
  const [angle] = useState(() => new Animated.Value(0));
  const [running, setRunning] = useState(false);
  const [fast, setFast] = useState(false);
  const animation = useRef(null);

  useEffect(() => () => animation.current?.stop(), []);

  const start = () => {
    setRunning(true);
    animation.current = Animated.loop(Animated.sequence([
      Animated.timing(angle, { duration: fast ? 700 : 1800, toValue: 1, useNativeDriver: true }),
      Animated.timing(angle, { duration: fast ? 700 : 1800, toValue: 0, useNativeDriver: true }),
    ]));
    animation.current.start();
  };
  const pause = () => { animation.current?.stop(); setRunning(false); };
  const reset = () => { animation.current?.stop(); angle.setValue(0); setRunning(false); };
  const changeSpeed = (isFast) => { animation.current?.stop(); setFast(isFast); setRunning(false); };

  return (
    <View>
      <Text style={styles.intro}>Una rueda gira alrededor de un eje central. Cambia su velocidad angular para comparar.</Text>
      <View style={styles.scene}>
        <Animated.View style={{ transform: [{ rotate: angle.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
          <SimpleWheel />
        </Animated.View>
        <Text style={styles.axis}>● eje de rotación</Text>
      </View>
      <Text style={styles.value}>Velocidad angular conceptual: {fast ? 'rápida' : 'lenta'}</Text>
      <Text style={styles.explanation}>La rotación ocurre cuando un objeto gira alrededor de un eje. El giroscopio detecta la velocidad angular de movimientos similares.</Text>
      <View style={styles.speedControls}>
        <Text style={styles.speedLabel}>Cambiar velocidad:</Text>
        <Text onPress={() => changeSpeed(false)} style={[styles.speedOption, !fast && styles.selected]}>Lenta</Text>
        <Text onPress={() => changeSpeed(true)} style={[styles.speedOption, fast && styles.selected]}>Rápida</Text>
      </View>
      <SimulationControls onPause={pause} onReset={reset} onStart={start} running={running} />
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21 },
  scene: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.md, height: 210, justifyContent: 'center', marginTop: spacing.md },
  axis: { bottom: 12, color: colors.textSecondary, fontSize: typography.caption, position: 'absolute' },
  value: { color: colors.text, fontSize: typography.caption, fontWeight: '700', marginTop: spacing.md },
  explanation: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21, marginTop: spacing.sm },
  speedControls: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  speedLabel: { color: colors.textSecondary, fontSize: typography.caption },
  speedOption: { borderColor: colors.border, borderRadius: radii.pill, borderWidth: 1, color: colors.textSecondary, fontSize: typography.caption, overflow: 'hidden', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  selected: { backgroundColor: colors.primarySoft, borderColor: colors.primary, color: colors.primary, fontWeight: '800' },
});
