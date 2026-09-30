import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/theme';

export default function SimpleWheel({ size = 144, style }) {
  const spokeLength = size - 28;
  const spokeStyle = { height: 4, width: spokeLength };

  return (
    <View style={[styles.wheel, { borderRadius: size / 2, height: size, width: size }, style]}>
      <View style={[styles.spoke, spokeStyle, { transform: [{ rotate: '0deg' }] }]} />
      <View style={[styles.spoke, spokeStyle, { transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.spoke, spokeStyle, { transform: [{ rotate: '90deg' }] }]} />
      <View style={[styles.spoke, spokeStyle, { transform: [{ rotate: '135deg' }] }]} />
      <View style={[styles.hub, { borderRadius: size * 0.09, height: size * 0.16, width: size * 0.16 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wheel: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderWidth: 7,
    justifyContent: 'center',
  },
  spoke: {
    backgroundColor: colors.primary,
    position: 'absolute',
  },
  hub: {
    backgroundColor: colors.accent,
    borderColor: colors.textOnPrimary,
    borderWidth: 2,
  },
});
