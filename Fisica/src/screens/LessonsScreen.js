import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import LessonCard from '../components/LessonCard';
import LessonModal from '../components/LessonModal';
import PhysicsSimulationModal from '../components/PhysicsSimulationModal';
import { colors, spacing, typography } from '../constants/theme';
import lessons from '../data/lessons';

export default function LessonsScreen() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSimulation, setSelectedSimulation] = useState(null);

  const openSimulation = (lesson) => {
    setSelectedLesson(null);
    setSelectedSimulation(lesson);
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        data={lessons}
        keyExtractor={(lesson) => lesson.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Lecciones</Text>
            <Text style={styles.description}>
              Conceptos esenciales para entender el movimiento y la materia.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <LessonCard lesson={item} onPress={() => setSelectedLesson(item)} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <LessonModal
        lesson={selectedLesson}
        onClose={() => setSelectedLesson(null)}
        onOpenSimulation={openSimulation}
        visible={Boolean(selectedLesson)}
      />
      <PhysicsSimulationModal
        onClose={() => setSelectedSimulation(null)}
        simulation={selectedSimulation?.simulation}
        title={selectedSimulation?.title}
        visible={Boolean(selectedSimulation)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
