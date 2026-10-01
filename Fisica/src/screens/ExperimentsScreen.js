import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import ExperimentCard from '../components/ExperimentCard';
import ExperimentInstructionModal from '../components/ExperimentInstructionModal';
import ExperimentResultModal from '../components/ExperimentResultModal';
import SensorValueCard from '../components/SensorValueCard';
import { colors, radii, shadows, spacing, typography } from '../constants/theme';
import experiments from '../data/experiments';
import useAccelerometer from '../hooks/useAccelerometer';
import useGyroscope from '../hooks/useGyroscope';
import useMagnetometer from '../hooks/useMagnetometer';
import useProgress from '../hooks/useProgress';
import { toFiniteNumber } from '../utils/sensorData';

const LEVEL_TOLERANCE = 0.18;
const LEVEL_HOLD_MS = 3000;
const ACCELERATION_THRESHOLD = 0.25;
const ROTATION_THRESHOLD = 0.6;
const ROTATION_HOLD_MS = 300;
const MAGNETIC_MIN_CHANGE = 8;
const MAGNETIC_RELATIVE_CHANGE = 0.2;
const EMPTY_SENSOR_DATA = { x: 0, y: 0, z: 0 };

export default function ExperimentsScreen() {
  const [instructionExperiment, setInstructionExperiment] = useState(null);
  const [activeExperiment, setActiveExperiment] = useState(null);
  const [resultExperiment, setResultExperiment] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const { progress, completeExperiment, refresh } = useProgress();

  const balanceStartRef = useRef(null);
  const rotationStartRef = useRef(null);
  const magneticBaselineRef = useRef(null);
  const completionRef = useRef(false);

  const isAccelerometerActive = isRunning && activeExperiment?.sensorType === 'accelerometer';
  const isGyroscopeActive = isRunning && activeExperiment?.sensorType === 'gyroscope';
  const isMagnetometerActive = isRunning && activeExperiment?.sensorType === 'magnetometer';

  const accelerometer = useAccelerometer({ enabled: isAccelerometerActive });
  const gyroscope = useGyroscope({ enabled: isGyroscopeActive });
  const magnetometer = useMagnetometer({ enabled: isMagnetometerActive });

  const sensorState = {
    accelerometer,
    gyroscope,
    magnetometer,
  }[activeExperiment?.sensorType];

  const sensorData = sensorState ? sensorState.data : EMPTY_SENSOR_DATA;
  const sensorAvailable = sensorState?.isAvailable;

  useEffect(() => {
    balanceStartRef.current = null;
    rotationStartRef.current = null;
    magneticBaselineRef.current = null;
    completionRef.current = false;
  }, [activeExperiment?.id, isRunning]);

  useEffect(() => {
    if (!isRunning || !activeExperiment || sensorAvailable !== true || !sensorData.timestamp) {
      return undefined;
    }

    let completionTimeout;
     const x = toFiniteNumber(sensorData.x);
     const y = toFiniteNumber(sensorData.y);
     const z = toFiniteNumber(sensorData.z);
    const now = Date.now();

    const complete = () => {
      if (completionRef.current) return;

      completionRef.current = true;
      completionTimeout = setTimeout(() => {
        setIsRunning(false);
        setResultExperiment(activeExperiment);
        completeExperiment(activeExperiment.id).then(refresh);
      }, 0);
    };

    if (activeExperiment.id === 'balance') {
      const isLevel =
        Math.abs(x) <= LEVEL_TOLERANCE &&
        Math.abs(y) <= LEVEL_TOLERANCE &&
        Math.abs(Math.abs(z) - 1) <= LEVEL_TOLERANCE;

      if (isLevel) {
        if (!balanceStartRef.current) {
          balanceStartRef.current = now;
        }

        if (now - balanceStartRef.current >= LEVEL_HOLD_MS) complete();
      } else {
        balanceStartRef.current = null;
      }
    }

    if (activeExperiment.id === 'acceleration') {
      const totalAcceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      if (Math.abs(totalAcceleration - 1) >= ACCELERATION_THRESHOLD) complete();
    }

    if (activeExperiment.id === 'rotation') {
      const angularSpeed = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      if (angularSpeed >= ROTATION_THRESHOLD) {
        if (!rotationStartRef.current) rotationStartRef.current = now;
        if (now - rotationStartRef.current >= ROTATION_HOLD_MS) complete();
      } else {
        rotationStartRef.current = null;
      }
    }

    if (activeExperiment.id === 'magnetic-field') {
      const magneticTotal = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

      if (magneticBaselineRef.current === null) {
        magneticBaselineRef.current = magneticTotal;
      } else {
        const change = Math.abs(magneticTotal - magneticBaselineRef.current);
        const relativeThreshold = magneticBaselineRef.current * MAGNETIC_RELATIVE_CHANGE;
        if (change >= Math.max(MAGNETIC_MIN_CHANGE, relativeThreshold)) complete();
      }
    }

    return () => clearTimeout(completionTimeout);
  }, [activeExperiment, completeExperiment, isRunning, refresh, sensorAvailable, sensorData]);

  const startExperiment = () => {
    setActiveExperiment(instructionExperiment);
    setInstructionExperiment(null);
    setResultExperiment(null);
    setIsRunning(true);
  };

  const exitExperiment = () => {
    setIsRunning(false);
    setActiveExperiment(null);
    setResultExperiment(null);
    setInstructionExperiment(null);
  };

  const repeatExperiment = () => {
    setResultExperiment(null);
    setIsRunning(true);
  };

  if (activeExperiment) {
    return (
      <>
        <ExperimentActiveView
          experiment={activeExperiment}
          isRunning={isRunning}
          sensorAvailable={sensorAvailable}
          sensorData={sensorData}
          onBack={exitExperiment}
          onHelp={() => setInstructionExperiment(activeExperiment)}
        />
        <ExperimentInstructionModal
          experiment={instructionExperiment}
          onCancel={() => setInstructionExperiment(null)}
          onStart={startExperiment}
          visible={Boolean(instructionExperiment)}
        />
        <ExperimentResultModal
          experiment={resultExperiment}
          onExit={exitExperiment}
          onRepeat={repeatExperiment}
          visible={Boolean(resultExperiment)}
        />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Experimentos</Text>
        <Text style={styles.description}>
          Pon en práctica los conceptos de física utilizando los sensores de tu teléfono.
        </Text>
        {experiments.map((experiment) => (
          <ExperimentCard
            completed={Boolean(progress.experiments[experiment.id])}
            experiment={experiment}
            key={experiment.id}
            onPress={() => setInstructionExperiment(experiment)}
          />
        ))}
      </ScrollView>
      <ExperimentInstructionModal
        experiment={instructionExperiment}
        onCancel={() => setInstructionExperiment(null)}
        onStart={startExperiment}
        visible={Boolean(instructionExperiment && !activeExperiment)}
      />
    </View>
  );
}

function ExperimentActiveView({
  experiment,
  isRunning,
  sensorAvailable,
  sensorData,
  onBack,
  onHelp,
}) {
  const x = toFiniteNumber(sensorData.x);
  const y = toFiniteNumber(sensorData.y);
  const z = toFiniteNumber(sensorData.z);
  const total = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  const isBalance = experiment.id === 'balance';
  const isAcceleration = experiment.id === 'acceleration';
  const isRotation = experiment.id === 'rotation';

  let status = 'Mueve el teléfono suavemente para comenzar.';
  if (isBalance) {
    if (Math.abs(x) > LEVEL_TOLERANCE) status = x > 0 ? 'Inclina hacia la izquierda' : 'Inclina hacia la derecha';
    else if (Math.abs(y) > LEVEL_TOLERANCE) status = y > 0 ? 'Inclina hacia atrás' : 'Inclina hacia adelante';
    else if (Math.abs(Math.abs(z) - 1) > LEVEL_TOLERANCE) status = 'Coloca el teléfono más horizontal';
    else status = '¡Nivelado! Mantén la posición';
  }
  if (isAcceleration) status = Math.abs(total - 1) >= ACCELERATION_THRESHOLD ? '¡Aceleración detectada!' : 'Mueve el teléfono con suavidad';
  if (isRotation) status = total >= ROTATION_THRESHOLD ? '¡Rotación detectada!' : 'Gira lentamente el teléfono hacia un lado';
  if (experiment.id === 'magnetic-field') status = 'Cambia la orientación para variar la lectura';
  if (sensorAvailable === false) status = 'Este sensor no está disponible en tu dispositivo.';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.activeContent} showsVerticalScrollIndicator={false}>
        <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Volver a experimentos</Text>
        </Pressable>
        <Text style={styles.activeTitle}>{experiment.title}</Text>
        <Text style={styles.activeDescription}>{experiment.objective}</Text>

        {sensorAvailable === false ? (
          <View style={styles.unavailableCard}>
            <Text style={styles.unavailableTitle}>Sensor no disponible</Text>
            <Text style={styles.unavailableText}>{status}</Text>
          </View>
        ) : (
          <>
            {isBalance ? (
              <View style={styles.balancePanel}>
                <View style={styles.balanceTrack}>
                  <View
                    style={[
                      styles.balanceMarker,
                      { transform: [{ translateX: Math.max(-40, Math.min(40, x * 100)) }, { translateY: Math.max(-40, Math.min(40, y * 100)) }] },
                    ]}
                  />
                </View>
                <Text style={styles.balanceStatus}>{status}</Text>
              </View>
            ) : null}
            <View style={styles.valuesRow}>
              <SensorValueCard axis="X" value={x} unit={isRotation ? 'rad/s' : isBalance || isAcceleration ? 'g' : 'μT'} />
              <SensorValueCard axis="Y" value={y} unit={isRotation ? 'rad/s' : isBalance || isAcceleration ? 'g' : 'μT'} />
              <SensorValueCard axis="Z" value={z} unit={isRotation ? 'rad/s' : isBalance || isAcceleration ? 'g' : 'μT'} />
            </View>
            {isAcceleration || isRotation || experiment.id === 'magnetic-field' ? (
              <View style={styles.totalCard}>
                <Text style={styles.totalLabel}>{isRotation ? 'Velocidad angular total' : isAcceleration ? 'Aceleración total' : 'Campo magnético total'}</Text>
                <Text style={styles.totalValue}>{total.toFixed(3)} {isRotation ? 'rad/s' : isAcceleration ? 'g' : 'μT'}</Text>
                <Text style={styles.totalFormula}>√(x² + y² + z²)</Text>
              </View>
            ) : null}
          </>
        )}

        <Text style={styles.statusText}>{isRunning ? status : 'Experimento completado'}</Text>
        <Pressable accessibilityRole="button" onPress={onHelp} style={styles.helpButton}>
          <Text style={styles.helpText}>Ver instrucciones</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  activeContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl + spacing.lg,
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
    marginBottom: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  backText: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  activeTitle: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  activeDescription: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  balancePanel: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
    ...shadows.card,
  },
  balanceTrack: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.info,
    borderRadius: 58,
    borderWidth: 1,
    height: 116,
    justifyContent: 'center',
    width: 116,
  },
  balanceMarker: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 24,
    width: 24,
  },
  balanceStatus: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '700',
    marginTop: spacing.md,
    textAlign: 'center',
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  valuesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  totalCard: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.infoBorder,
    borderRadius: radii.md,
    borderWidth: 1,
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
  statusText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  helpButton: {
    alignItems: 'center',
    borderColor: colors.primary,
    borderRadius: radii.sm,
    borderWidth: 1,
    marginTop: spacing.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  helpText: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  unavailableCard: {
    backgroundColor: colors.warningSoft,
    borderColor: colors.warningBorder,
    borderRadius: radii.md,
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
});
