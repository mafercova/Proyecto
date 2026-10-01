import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../constants/theme';

export default function QuizOption({
  text,
  selected = false,
  correct = false,
  incorrect = false,
  disabled = false,
  onPress,
}) {
  const stateStyle = correct ? styles.correct : incorrect ? styles.incorrect : null;
  const indicatorStyle = correct ? styles.correctIndicator : incorrect ? styles.incorrectIndicator : null;
  const indicatorText = correct ? '✓' : incorrect ? '✕' : '';

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.option, selected && styles.selected, stateStyle, pressed && styles.pressed]}
    >
      <View style={[styles.indicator, selected && styles.selectedIndicator, indicatorStyle]}>
        <Text style={[styles.indicatorText, (correct || incorrect) && styles.resultIndicatorText]}>
          {indicatorText}
        </Text>
      </View>
      <Text style={[styles.text, (correct || incorrect) && styles.resultText]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: spacing.sm,
    minHeight: 62,
    padding: spacing.md,
  },
  selected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  correct: {
    backgroundColor: colors.successSoft,
    borderColor: colors.success,
  },
  incorrect: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
  },
  pressed: {
    opacity: 0.78,
  },
  indicator: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 24,
  },
  selectedIndicator: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  correctIndicator: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  incorrectIndicator: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  indicatorText: {
    color: colors.textOnPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  resultIndicatorText: {
    color: colors.textOnPrimary,
  },
  text: {
    color: colors.text,
    flex: 1,
    fontSize: typography.body,
    lineHeight: 21,
  },
  resultText: {
    fontWeight: '600',
  },
});
