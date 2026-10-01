import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../constants/theme';
import { toFiniteNumber } from '../utils/sensorData';

export default function SensorValueCard({ axis, value, unit = '' }) {
  const safeValue = toFiniteNumber(value);

  return (
    <View style={styles.card}>
      <Text style={styles.axis}>{axis}</Text>
      <Text style={styles.value}>{safeValue.toFixed(3)}</Text>
      {unit ? <Text style={styles.unit}>{unit}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.md,
    flex: 1,
    minHeight: 104,
    justifyContent: 'center',
    padding: spacing.sm,
    ...shadows.card,
  },
  axis: {
    color: colors.primary,
    fontSize: typography.cardTitle,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  unit: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    marginTop: 2,
  },
});
