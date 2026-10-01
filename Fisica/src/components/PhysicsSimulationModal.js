import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../constants/theme';
import AccelerationSimulation from './simulations/AccelerationSimulation';
import GravitySimulation from './simulations/GravitySimulation';
import MagnetismSimulation from './simulations/MagnetismSimulation';
import MovementSimulation from './simulations/MovementSimulation';
import RotationSimulation from './simulations/RotationSimulation';
import VelocitySimulation from './simulations/VelocitySimulation';

const simulations = {
  motion: MovementSimulation,
  speed: VelocitySimulation,
  acceleration: AccelerationSimulation,
  gravity: GravitySimulation,
  rotation: RotationSimulation,
  magnetism: MagnetismSimulation,
};

export default function PhysicsSimulationModal({ simulation, title, visible, onClose }) {
  const Simulation = simulations[simulation];

  if (!Simulation) return null;

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.eyebrow}>MINI SIMULACIÓN</Text>
            <Text style={styles.title}>{title}</Text>
            {visible ? <Simulation /> : null}
            <Pressable accessibilityRole="button" onPress={onClose} style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
              <Text style={styles.closeText}>Cerrar simulación</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: colors.overlay, flex: 1, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.surface, borderColor: colors.border, borderTopLeftRadius: radii.lg, borderTopRightRadius: radii.lg, borderWidth: 1, maxHeight: '94%', ...shadows.floating },
  content: { padding: spacing.lg },
  eyebrow: { color: colors.primary, fontSize: typography.caption, fontWeight: '800', letterSpacing: 1, marginBottom: spacing.xs },
  title: { color: colors.text, fontSize: typography.title, fontWeight: '800', marginBottom: spacing.md },
  closeButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radii.sm, justifyContent: 'center', marginTop: spacing.lg, minHeight: 48, ...shadows.card },
  pressed: { backgroundColor: colors.primaryDark },
  closeText: { color: colors.textOnPrimary, fontSize: typography.body, fontWeight: '700' },
});
