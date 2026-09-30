import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { colors, typography } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import LessonsScreen from '../screens/LessonsScreen';
import LaboratoryScreen from '../screens/LaboratoryScreen';
import ExperimentsScreen from '../screens/ExperimentsScreen';
import QuizScreen from '../screens/QuizScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colors.text,
          fontSize: typography.cardTitle,
          fontWeight: '700',
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarAccessibilityLabel: 'Pestaña Inicio',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 19 }}>⌂</Text>,
        }}
      />
      <Tab.Screen
        name="Lecciones"
        component={LessonsScreen}
        options={{
          tabBarAccessibilityLabel: 'Pestaña Lecciones',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 19 }}>≡</Text>,
        }}
      />
      <Tab.Screen
        name="Lab"
        component={LaboratoryScreen}
        options={{
          tabBarAccessibilityLabel: 'Pestaña Laboratorio',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>◉</Text>,
        }}
      />
      <Tab.Screen
        name="Experimentos"
        component={ExperimentsScreen}
        options={{
          tabBarAccessibilityLabel: 'Pestaña Experimentos',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>✦</Text>,
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          tabBarAccessibilityLabel: 'Pestaña Quiz',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>?</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
