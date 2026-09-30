import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../constants/theme';

export default function RealLifeExample({ title = 'Ejemplo real', text, icon }) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
    borderRadius: radii.md,
    borderWidth: 1,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  icon: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typography.cardTitle,
    fontWeight: '800',
  },
  text: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 21,
  },
});
