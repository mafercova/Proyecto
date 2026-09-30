import { Animated, StyleSheet, View } from 'react-native';

import { colors, radii } from '../constants/theme';

export default function SimpleCar({ style, wheelRotation = '0deg' }) {
  const wheelTransform = wheelRotation && typeof wheelRotation === 'object' && wheelRotation.rotate
    ? [wheelRotation]
    : [{ rotate: wheelRotation || '0deg' }];

  return (
    <Animated.View style={[styles.car, style]}>
      <View style={styles.cabin}>
        <View style={styles.windowFront} />
        <View style={styles.windowBack} />
      </View>
      <View style={styles.body}>
        <View style={styles.headlight} />
        <View style={styles.tailLight} />
      </View>
      <Animated.View style={[styles.wheel, styles.frontWheel, { transform: wheelTransform }]}>
        <View style={styles.hub} />
      </Animated.View>
      <Animated.View style={[styles.wheel, styles.backWheel, { transform: wheelTransform }]}>
        <View style={styles.hub} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  car: {
    height: 52,
    position: 'relative',
    width: 84,
  },
  body: {
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
    bottom: 10,
    height: 25,
    left: 4,
    position: 'absolute',
    right: 4,
  },
  cabin: {
    backgroundColor: colors.primaryDark,
    borderTopLeftRadius: radii.md,
    borderTopRightRadius: radii.md,
    height: 24,
    left: 20,
    position: 'absolute',
    top: 3,
    width: 45,
  },
  windowFront: {
    backgroundColor: colors.primaryOnDark,
    borderTopRightRadius: 5,
    height: 13,
    position: 'absolute',
    right: 4,
    top: 4,
    width: 17,
  },
  windowBack: {
    backgroundColor: colors.primaryOnDark,
    borderTopLeftRadius: 5,
    height: 13,
    left: 4,
    position: 'absolute',
    top: 4,
    width: 17,
  },
  headlight: {
    backgroundColor: '#FDE68A',
    borderRadius: 3,
    height: 6,
    position: 'absolute',
    right: 2,
    top: 9,
    width: 5,
  },
  tailLight: {
    backgroundColor: colors.danger,
    borderRadius: 3,
    height: 6,
    left: 2,
    position: 'absolute',
    top: 9,
    width: 5,
  },
  wheel: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderColor: colors.textSecondary,
    borderRadius: 10,
    borderWidth: 2,
    bottom: 0,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    width: 20,
  },
  frontWheel: {
    right: 12,
  },
  backWheel: {
    left: 12,
  },
  hub: {
    backgroundColor: colors.disabled,
    borderRadius: 3,
    height: 6,
    width: 6,
  },
});
