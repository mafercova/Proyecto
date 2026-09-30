import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../constants/theme';
import { toFiniteNumber } from '../utils/sensorData';

const FIELD_LIMIT = 120;
const CHANGE_THRESHOLD = 8;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function MagnetometerVisualizer({ x = 0, y = 0, z = 0, paused = false }) {
  const [level] = useState(() => new Animated.Value(0));
  const [fieldStatus, setFieldStatus] = useState('stable');
  const previousMagnitude = useRef(null);
  const numericX = toFiniteNumber(x);
  const numericY = toFiniteNumber(y);
  const numericZ = toFiniteNumber(z);
  const magnitude = Math.sqrt(numericX ** 2 + numericY ** 2 + numericZ ** 2);
  const normalizedLevel = clamp(magnitude, 0, FIELD_LIMIT) / FIELD_LIMIT;

  useEffect(() => {
    if (paused) {
      level.stopAnimation();
      return undefined;
    }

    const previous = previousMagnitude.current;
    if (previous !== null) {
      setFieldStatus(Math.abs(magnitude - previous) >= CHANGE_THRESHOLD ? 'changed' : 'stable');
    }
    previousMagnitude.current = magnitude;

    Animated.timing(level, {
      duration: 150,
      toValue: normalizedLevel,
      useNativeDriver: true,
    }).start();

    return undefined;
  }, [level, magnitude, normalizedLevel, paused]);

  const explanation = fieldStatus === 'changed'
    ? 'La intensidad del campo magnético cambió significativamente. Puede ocurrir al acercar un objeto magnético o cambiar la orientación del teléfono.'
    : 'Se detecta un campo magnético relativamente estable, como el campo magnético terrestre.';

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Campo magnético detectado</Text>
      <View style={styles.area}>
        <Animated.View style={[styles.fieldCircle, { transform: [{ scale: level.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1.35], extrapolate: 'clamp' }) }] }]} />
        <View style={styles.fieldLines}>
          <Text style={styles.fieldLine}>←  →</Text>
          <Text style={styles.fieldLine}>←  →</Text>
          <Text style={styles.fieldLine}>←  →</Text>
        </View>
      </View>
      <Text style={styles.value}>Magnitud: {magnitude.toFixed(1)} μT</Text>
      <View style={styles.explanationCard}>
        <Text style={styles.explanationTitle}>¿Qué está ocurriendo?</Text>
        <Text style={styles.explanation}>{explanation}</Text>
        <Text style={styles.note}>Las líneas son una representación educativa. El magnetómetro ayuda a las brújulas digitales a detectar el campo alrededor del teléfono.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radii.md, marginTop: spacing.md, padding: spacing.md },
  label: { color: colors.text, fontSize: typography.cardTitle, fontWeight: '800', marginBottom: spacing.sm },
  area: { alignItems: 'center', backgroundColor: colors.accentSoft, borderRadius: radii.sm, height: 190, justifyContent: 'center', overflow: 'hidden' },
  fieldCircle: { backgroundColor: colors.accent, borderColor: colors.textOnPrimary, borderRadius: 48, borderWidth: 4, height: 72, position: 'absolute', width: 72 },
  fieldLines: { gap: spacing.sm, position: 'absolute' },
  fieldLine: { color: colors.primaryDark, fontSize: typography.cardTitle, fontWeight: '800', letterSpacing: 8 },
  value: { color: colors.primaryDark, fontSize: typography.body, fontWeight: '800', marginTop: spacing.sm, textAlign: 'center' },
  explanationCard: { backgroundColor: colors.accentSoft, borderRadius: radii.sm, marginTop: spacing.md, padding: spacing.md },
  explanationTitle: { color: colors.text, fontSize: typography.cardTitle, fontWeight: '800', marginBottom: spacing.xs },
  explanation: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21 },
  note: { color: colors.textSecondary, fontSize: typography.caption, lineHeight: 19, marginTop: spacing.sm },
});
