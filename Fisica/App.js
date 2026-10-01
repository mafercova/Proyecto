import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import TabNavigator from './src/navigation/TabNavigator';

SplashScreen.setOptions({
  duration: 650,
  fade: true,
});

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
