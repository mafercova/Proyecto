import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../../constants/theme';
import { SimpleMagnet, SimpleMetalPiece } from '../SimpleMagnet';
import SimulationControls from './SimulationControls';

export default function MagnetismSimulation() {
  const [progress] = useState(() => new Animated.Value(0));
  const [sceneWidth, setSceneWidth] = useState(0);
  const [running, setRunning] = useState(false);
  const [attracted, setAttracted] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    const listener = progress.addListener(({ value }) => setAttracted(value > 0.9));
    return () => {
      progress.removeListener(listener);
      animation.current?.stop();
    };
  }, [progress]);

  const start = () => {
    setRunning(true);
    animation.current = Animated.timing(progress, { duration: 3500, toValue: 1, useNativeDriver: true });
    animation.current.start(({ finished }) => { if (finished) setRunning(false); });
  };
  const pause = () => { animation.current?.stop(); setRunning(false); };
  const reset = () => { animation.current?.stop(); progress.setValue(0); setAttracted(false); setRunning(false); };

  return (
    <View>
      <Text style={styles.intro}>El objeto metálico se acerca al imán por la fuerza del campo magnético.</Text>
      <View onLayout={({ nativeEvent }) => setSceneWidth(nativeEvent.layout.width)} style={styles.scene}>
        <SimpleMagnet style={styles.magnet} />
        <View style={styles.fieldLines}><Text style={styles.field}>→ → →</Text><Text style={styles.field}>→ → →</Text><Text style={styles.field}>→ → →</Text></View>
        <Animated.View style={[styles.metal, { transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, -Math.max(sceneWidth - 150, 0)] }) }] }]}>
          <SimpleMetalPiece />
        </Animated.View>
      </View>
      <Text style={styles.status}>{attracted ? 'El objeto llegó cerca del imán.' : 'Las flechas representan el campo magnético de forma conceptual.'}</Text>
      <Text style={styles.explanation}>Un campo magnético puede ejercer fuerzas sobre determinados materiales. El magnetómetro del teléfono mide el campo cercano, pero estas flechas no son mediciones exactas.</Text>
      <SimulationControls onPause={pause} onReset={reset} onStart={start} running={running} />
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21 },
  scene: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.md, flexDirection: 'row', height: 190, marginTop: spacing.md, overflow: 'hidden' },
  magnet: { marginLeft: 12 },
  fieldLines: { gap: spacing.md, marginLeft: spacing.sm },
  field: { color: colors.primaryDark, fontSize: typography.body, fontWeight: '800' },
  metal: { height: 48, position: 'absolute', right: 22, width: 48 },
  status: { color: colors.accent, fontSize: typography.caption, fontWeight: '700', lineHeight: 19, marginTop: spacing.md },
  explanation: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 21, marginTop: spacing.sm },
});
