import 'react-native-gesture-handler';
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {OverviewStackNavigator} from './stack1Navigation';
import SplashScreen from 'react-native-splash-screen';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  //Hide Splash screen on app load.
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <OverviewStackNavigator />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
