import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../constants/theme';
import { toFiniteNumber } from '../utils/sensorData';
import SimpleCar from './SimpleCar';

const OBJECT_SIZE = 84;
const ACCELERATION_LIMIT = 1.5;
const DEAD_ZONE = 0.15;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function AccelerometerVisualizer({ x = 0, y = 0, paused = false }) {
  const [translateX] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(0));
  const [area, setArea] = useState({ width: 0, height: 0 });
  const numericX = toFiniteNumber(x);
  const numericY = toFiniteNumber(y);
  const horizontalDirection = numericX > DEAD_ZONE ? 'right' : numericX < -DEAD_ZONE ? 'left' : 'stable';
  const gravityAngle = clamp(
    Math.atan2(numericX, Math.abs(numericY) + 0.5) * (180 / Math.PI),
    -60,
    60
  );

  useEffect(() => {
    if (paused) {
      translateX.stopAnimation();
      translateY.stopAnimation();
      return undefined;
    }

    const maxX = Math.max((area.width - OBJECT_SIZE) / 2, 0);
    const maxY = Math.max((area.height - OBJECT_SIZE) / 2, 0);
    const targetX = clamp(numericX, -ACCELERATION_LIMIT, ACCELERATION_LIMIT) / ACCELERATION_LIMIT * maxX;
    const targetY = clamp(numericY, -ACCELERATION_LIMIT, ACCELERATION_LIMIT) / ACCELERATION_LIMIT * maxY;

    Animated.parallel([
      Animated.timing(translateX, { duration: 150, toValue: targetX, useNativeDriver: true }),
      Animated.timing(translateY, { duration: 150, toValue: targetY, useNativeDriver: true }),
    ]).start();

    return undefined;
  }, [area.height, area.width, numericX, numericY, paused, translateX, translateY]);

  const explanation = horizontalDirection === 'right'
    ? 'El dispositivo experimenta una aceleración hacia la derecha. La aceleración representa un cambio en la velocidad con respecto al tiempo.'
    : horizontalDirection === 'left'
      ? 'La dirección de la aceleración cambió hacia la izquierda.'
      : Math.abs(numericY) > DEAD_ZONE
        ? 'Al inclinar el dispositivo, la gravedad se distribuye entre diferentes ejes del acelerómetro.'
        : 'El dispositivo está relativamente estable. El acelerómetro sigue detectando el efecto de la gravedad.';
  const directionLabel = horizontalDirection === 'right'
    ? '→ aceleración hacia la derecha'
    : horizontalDirection === 'left'
      ? '← aceleración hacia la izquierda'
      : 'Movimiento horizontal estable';

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Movimiento detectado por el acelerómetro</Text>
      <View onLayout={({ nativeEvent }) => setArea(nativeEvent.layout)} style={styles.area}>
        <View style={[styles.gravityArrow, { transform: [{ rotate: `${gravityAngle}deg` }] }]}>
          <Text style={styles.gravityText}>↓ g</Text>
        </View>
        <Animated.View style={[styles.object, { transform: [{ translateX }, { translateY }] }]}>
          <SimpleCar />
        </Animated.View>
      </View>
      <Text style={styles.direction}>{directionLabel}</Text>
      <Text style={styles.axisHint}>X controla el desplazamiento horizontal · Y muestra cambios verticales o inclinación</Text>
      <View style={styles.explanationCard}>
        <Text style={styles.explanationTitle}>¿Qué está ocurriendo?</Text>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radii.md, marginTop: spacing.md, padding: spacing.md },
  label: { color: colors.text, fontSize: typography.cardTitle, fontWeight: '800', marginBottom: spacing.sm },
  area: { alignItems: 'center', backgroundColor: colors.primarySoft, borderColor: colors.primary, borderRadius: radii.sm, borderWidth: 1, height: 190, justifyContent: 'center', overflow: 'hidden' },
  object: { height: 52, position: 'absolute', width: OBJECT_SIZE },
  gravityArrow: { alignItems: 'center', position: 'absolute', right: spacing.lg, top: spacing.md },
  gravityText: { color: colors.accent, fontSize: typography.cardTitle, fontWeight: '800' },
  direction: { color: colors.primaryDark, fontSize: typography.body, fontWeight: '800', marginTop: spacing.sm, textAlign: 'center' },
  axisHint: { color: colors.textSecondary, fontSize: typography.caption, lineHeight: 19, marginTop: spacing.xs },
  explanationCard: { backgroundColor: colors.primarySoft, borderRadius: radii.sm, marginTop: spacing.md, padding: spacing.md },
  explanationTitle: { color: colors.text, fontSize: typography.cardTitle, fontWeight: '800', marginBottom: spacing.xs },
  explanation: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21 },
});
