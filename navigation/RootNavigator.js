import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';

/** Stack navigator to use. */
const Stack = createStackNavigator();

/** Root navigator of the application, containing the main tab navigator and an error screen. */
export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName='main' screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='main'
        component={MainNavigator}
      />
      <Stack.Screen
        name='not-found'
        component={NotFoundScreen}
      />
    </Stack.Navigator>
  );
}

/** Stylesheet. */
const styles = StyleSheet.create({
});