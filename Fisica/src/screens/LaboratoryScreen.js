import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AccelerometerVisualizer from '../components/AccelerometerVisualizer';
import GyroscopeVisualizer from '../components/GyroscopeVisualizer';
import MagnetometerVisualizer from '../components/MagnetometerVisualizer';
import RealLifeExample from '../components/RealLifeExample';
import SensorHelpModal from '../components/SensorHelpModal';
import SensorValueCard from '../components/SensorValueCard';
import { colors, radii, spacing, typography } from '../constants/theme';
import useAccelerometer from '../hooks/useAccelerometer';
import useGyroscope from '../hooks/useGyroscope';
import useMagnetometer from '../hooks/useMagnetometer';
import { toFiniteNumber } from '../utils/sensorData';

const SENSOR_OPTIONS = [
  { id: 'accelerometer', label: 'Acelerómetro' },
  { id: 'gyroscope', label: 'Giroscopio' },
  { id: 'magnetometer', label: 'Magnetómetro' },
];

const SENSOR_CONTENT = {
  accelerometer: {
    title: 'Acelerómetro',
    description: 'Mide la aceleración del dispositivo en tres dimensiones.',
    readingUnit: 'g',
    axisHelp: 'X: izquierda / derecha   Y: arriba / abajo   Z: perpendicular a la pantalla',
  },
  gyroscope: {
    title: 'Giroscopio',
    description: 'Mide qué tan rápido rota el dispositivo alrededor de cada eje.',
    readingUnit: 'rad/s',
    axisHelp: 'Los valores representan velocidad de rotación alrededor de cada eje.',
  },
  magnetometer: {
    title: 'Magnetómetro',
    description: 'Detecta la intensidad del campo magnético que rodea al dispositivo.',
    readingUnit: 'μT',
    axisHelp: 'Los valores indican la intensidad del campo magnético en cada eje.',
  },
};

export default function LaboratoryScreen() {
  const [activeSensor, setActiveSensor] = useState('accelerometer');
  const [isPaused, setIsPaused] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);

  const accelerometer = useAccelerometer({
    enabled: activeSensor === 'accelerometer',
    paused: isPaused,
  });
  const gyroscope = useGyroscope({
    enabled: activeSensor === 'gyroscope',
    paused: isPaused,
  });
  const magnetometer = useMagnetometer({
    enabled: activeSensor === 'magnetometer',
    paused: isPaused,
  });

  const sensorState = {
    accelerometer,
    gyroscope,
    magnetometer,
  }[activeSensor];
  const content = SENSOR_CONTENT[activeSensor];
  const x = toFiniteNumber(sensorState.data.x);
  const y = toFiniteNumber(sensorState.data.y);
  const z = toFiniteNumber(sensorState.data.z);
  const magneticTotal = useMemo(
    () => Math.sqrt(x ** 2 + y ** 2 + z ** 2),
    [x, y, z]
  );

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <Text style={styles.title}>Laboratorio</Text>
      <Text style={styles.description}>
        Explora en tiempo real los sensores integrados en tu dispositivo.
      </Text>

      <ScrollView
        contentContainerStyle={styles.sensorSelector}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {SENSOR_OPTIONS.map((sensor) => {
          const isActive = sensor.id === activeSensor;

          return (
            <Pressable
              accessibilityRole="button"
              key={sensor.id}
              onPress={() => {
                setActiveSensor(sensor.id);
                setIsPaused(false);
              }}
              style={[styles.sensorButton, isActive && styles.sensorButtonActive]}
            >
              <Text style={[styles.sensorButtonText, isActive && styles.sensorButtonTextActive]}>
                {sensor.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sensorTitle}>{content.title}</Text>
        <View style={[styles.statusDot, sensorState.isAvailable === false && styles.statusUnavailable]} />
      </View>
      <Text style={styles.sensorDescription}>{content.description}</Text>

      {sensorState.isAvailable === false ? (
        <View style={styles.unavailableCard}>
          <Text style={styles.unavailableTitle}>Sensor no disponible</Text>
          <Text style={styles.unavailableText}>
            Este sensor no está disponible en tu dispositivo.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.valuesRow}>
            <SensorValueCard axis="X" value={x} unit={content.readingUnit} />
            <SensorValueCard axis="Y" value={y} unit={content.readingUnit} />
            <SensorValueCard axis="Z" value={z} unit={content.readingUnit} />
          </View>
          {activeSensor === 'accelerometer' ? (
            <AccelerometerVisualizer paused={isPaused} x={x} y={y} />
          ) : null}
          {activeSensor === 'gyroscope' ? (
            <GyroscopeVisualizer paused={isPaused} x={x} y={y} z={z} />
          ) : null}
          {activeSensor === 'magnetometer' ? (
            <MagnetometerVisualizer paused={isPaused} x={x} y={y} z={z} />
          ) : null}
          {activeSensor === 'magnetometer' ? (
            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>Campo magnético total</Text>
              <Text style={styles.totalValue}>{magneticTotal.toFixed(3)} μT</Text>
              <Text style={styles.totalFormula}>√(x² + y² + z²)</Text>
            </View>
          ) : null}
        </>
      )}

      <Text style={styles.axisHelp}>{content.axisHelp}</Text>

      {sensorState.isAvailable !== false && activeSensor === 'accelerometer' ? (
        <RealLifeExample
          icon="📱"
          text="Un acelerómetro detecta cambios de movimiento. Por ejemplo, un teléfono puede saber si se inclina, acelera o cambia de orientación. Cuando está en reposo, también puede detectar el efecto de la gravedad."
        />
      ) : null}
      {sensorState.isAvailable !== false && activeSensor === 'gyroscope' ? (
        <RealLifeExample
          icon="↻"
          text="Los giroscopios se utilizan en teléfonos, drones y videojuegos para detectar cuándo un dispositivo está girando. Al girar el teléfono, detecta la velocidad angular de ese movimiento."
        />
      ) : null}
      {sensorState.isAvailable !== false && activeSensor === 'magnetometer' ? (
        <RealLifeExample
          icon="▣"
          text="El magnetómetro permite detectar campos magnéticos y ayuda al teléfono a determinar la dirección en una brújula digital. Por sí solo no genera una brújula completamente precisa."
        />
      ) : null}

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsPaused((paused) => !paused)}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>{isPaused ? 'Reanudar lectura' : 'Pausar lectura'}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => setHelpVisible(true)}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryPressed]}
        >
          <Text style={styles.secondaryButtonText}>¿Cómo probarlo?</Text>
        </Pressable>
      </View>

      {isPaused ? <Text style={styles.pausedText}>Lectura pausada. Los valores están congelados.</Text> : null}

      <SensorHelpModal
        onClose={() => setHelpVisible(false)}
        sensor={activeSensor}
        visible={helpVisible}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  sensorSelector: {
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  sensorButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  sensorButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sensorButtonText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  sensorButtonTextActive: {
    color: colors.textOnPrimary,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  sensorTitle: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '800',
  },
  statusDot: {
    backgroundColor: colors.accent,
    borderRadius: 6,
    height: 10,
    marginLeft: spacing.sm,
    width: 10,
  },
  statusUnavailable: {
    backgroundColor: colors.warning,
  },
  sensorDescription: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  valuesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  unavailableCard: {
    backgroundColor: colors.warningSoft,
    borderColor: colors.warningBorder,
    borderRadius: radii.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  unavailableTitle: {
    color: colors.warningText,
    fontSize: typography.cardTitle,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  unavailableText: {
    color: colors.warningDark,
    fontSize: typography.body,
  },
  totalCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: radii.md,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  totalLabel: {
    color: colors.primaryDark,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  totalValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginVertical: spacing.xs,
  },
  totalFormula: {
    color: colors.textSecondary,
    fontSize: typography.caption,
  },
  axisHelp: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    lineHeight: 19,
    marginTop: spacing.md,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    minHeight: 48,
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  primaryButtonText: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: colors.primary,
    borderRadius: radii.sm,
    borderWidth: 1,
    minHeight: 48,
    justifyContent: 'center',
  },
  secondaryPressed: {
    backgroundColor: colors.primarySoft,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  pausedText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
