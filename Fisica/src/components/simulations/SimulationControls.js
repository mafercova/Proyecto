import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../../constants/theme';

export default function SimulationControls({ running, onStart, onPause, onReset }) {
  return (
    <View style={styles.controls}>
      <Pressable
        accessibilityRole="button"
        disabled={running}
        onPress={onStart}
        style={({ pressed }) => [styles.primaryButton, running && styles.disabled, pressed && styles.pressed]}
      >
        <Text style={styles.primaryText}>Iniciar</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        disabled={!running}
        onPress={onPause}
        style={({ pressed }) => [styles.secondaryButton, !running && styles.disabled, pressed && styles.secondaryPressed]}
      >
        <Text style={styles.secondaryText}>Pausar</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={onReset}
        style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryPressed]}
      >
        <Text style={styles.secondaryText}>Reiniciar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    ...shadows.card,
  },
  primaryText: {
    color: colors.textOnPrimary,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: colors.primary,
    borderRadius: radii.sm,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  secondaryText: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  disabled: {
    borderColor: colors.disabled,
    opacity: 0.6,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  secondaryPressed: {
    backgroundColor: colors.primarySoft,
  },
});
