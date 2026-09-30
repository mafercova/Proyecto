import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/theme';

export default function SimpleBall({ style }) {
  return (
    <View style={[styles.ball, style]}>
      <View style={styles.highlight} />
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    backgroundColor: colors.danger,
    borderColor: colors.dangerBorder,
    borderRadius: 19,
    borderWidth: 2,
    elevation: 3,
    height: 38,
    shadowColor: colors.text,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 38,
  },
  highlight: {
    backgroundColor: colors.textOnPrimary,
    borderRadius: 4,
    height: 7,
    left: 8,
    opacity: 0.65,
    position: 'absolute',
    top: 6,
    width: 7,
  },
});
