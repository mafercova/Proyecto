import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, typography } from '../constants/theme';

export function SimpleMagnet({ style }) {
  return (
    <View style={[styles.magnet, style]}>
      <View style={styles.bridge}>
        <View style={styles.bridgeNorth} />
        <View style={styles.bridgeSouth} />
      </View>
      <View style={[styles.arm, styles.northArm]}><Text style={styles.pole}>N</Text></View>
      <View style={[styles.arm, styles.southArm]}><Text style={styles.pole}>S</Text></View>
    </View>
  );
}

export function SimpleMetalPiece({ style }) {
  return (
    <View style={[styles.metalPiece, style]}>
      <View style={styles.metalInner} />
    </View>
  );
}

const styles = StyleSheet.create({
  magnet: {
    height: 92,
    position: 'relative',
    width: 78,
  },
  bridge: {
    flexDirection: 'row',
    height: 28,
    left: 8,
    overflow: 'hidden',
    position: 'absolute',
    right: 8,
    top: 0,
  },
  bridgeNorth: {
    backgroundColor: colors.danger,
    flex: 1,
  },
  bridgeSouth: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  arm: {
    alignItems: 'center',
    borderBottomLeftRadius: radii.sm,
    borderBottomRightRadius: radii.sm,
    bottom: 0,
    height: 68,
    justifyContent: 'flex-end',
    paddingBottom: 8,
    position: 'absolute',
    width: 30,
  },
  northArm: {
    backgroundColor: colors.danger,
    left: 8,
  },
  southArm: {
    backgroundColor: colors.primary,
    right: 8,
  },
  pole: {
    color: colors.textOnPrimary,
    fontSize: typography.cardTitle,
    fontWeight: '800',
  },
  metalPiece: {
    alignItems: 'center',
    borderColor: colors.textSecondary,
    borderRadius: radii.sm,
    borderWidth: 4,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  metalInner: {
    borderColor: colors.disabled,
    borderRadius: radii.sm,
    borderWidth: 3,
    height: 28,
    width: 28,
  },
});
