import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../constants/theme';
import { toFiniteNumber } from '../utils/sensorData';
import SimpleWheel from './SimpleWheel';

const ROTATION_DEAD_ZONE = 0.15;
const MAX_VISUAL_SPEED = 3;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function GyroscopeVisualizer({ x = 0, y = 0, z = 0, paused = false }) {
  const [rotation] = useState(() => new Animated.Value(0));
  const rotationTarget = useRef(0);
  const animation = useRef(null);
  const numericX = toFiniteNumber(x);
  const numericY = toFiniteNumber(y);
  const numericZ = toFiniteNumber(z);
  const angularSpeed = Math.sqrt(numericX ** 2 + numericY ** 2 + numericZ ** 2);
  const dominantAxis = Math.abs(numericZ) >= Math.abs(numericX) && Math.abs(numericZ) >= Math.abs(numericY)
    ? numericZ
    : Math.abs(numericX) >= Math.abs(numericY) ? numericX : numericY;

  useEffect(() => {
    if (paused) {
      animation.current?.stop();
      return undefined;
    }

    if (angularSpeed <= ROTATION_DEAD_ZONE) {
      animation.current?.stop();
      return undefined;
    }

    rotationTarget.current += clamp(dominantAxis, -MAX_VISUAL_SPEED, MAX_VISUAL_SPEED) * 18;
    animation.current?.stop();
    animation.current = Animated.timing(rotation, {
      duration: clamp(220 - angularSpeed * 45, 70, 180),
      toValue: rotationTarget.current,
      useNativeDriver: true,
    });
    animation.current.start();

    return undefined;
  }, [angularSpeed, dominantAxis, paused, rotation]);

  useEffect(() => () => animation.current?.stop(), []);

  const explanation = angularSpeed <= ROTATION_DEAD_ZONE
    ? 'No se detecta una rotación importante.'
    : angularSpeed < 1
      ? 'El teléfono está rotando lentamente.'
      : 'El teléfono está rotando más rápidamente.';

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Rotación detectada por el giroscopio</Text>
      <View style={styles.area}>
        <Animated.View style={{ transform: [{ rotate: rotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'], extrapolate: 'extend' }) }] }}>
          <SimpleWheel />
        </Animated.View>
      </View>
      <Text style={styles.speed}>Velocidad angular: {angularSpeed.toFixed(2)} rad/s</Text>
      <View style={styles.explanationCard}>
        <Text style={styles.explanationTitle}>¿Qué está ocurriendo?</Text>
        <Text style={styles.explanation}>{explanation}</Text>
        <Text style={styles.note}>El giroscopio mide velocidad angular en radianes por segundo; esta rueda no representa una orientación absoluta.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radii.md, marginTop: spacing.md, padding: spacing.md },
  label: { color: colors.text, fontSize: typography.cardTitle, fontWeight: '800', marginBottom: spacing.sm },
  area: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.sm, height: 190, justifyContent: 'center' },
  speed: { color: colors.primaryDark, fontSize: typography.body, fontWeight: '800', marginTop: spacing.sm, textAlign: 'center' },
  explanationCard: { backgroundColor: colors.primarySoft, borderRadius: radii.sm, marginTop: spacing.md, padding: spacing.md },
  explanationTitle: { color: colors.text, fontSize: typography.cardTitle, fontWeight: '800', marginBottom: spacing.xs },
  explanation: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21 },
  note: { color: colors.textSecondary, fontSize: typography.caption, lineHeight: 19, marginTop: spacing.sm },
});
