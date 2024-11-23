import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import DirectoryScreen from '../screens/DirectoryScreen';
import PersonViewScreen from '../screens/PersonViewScreen';
import PersonEditScreen from '../screens/PersonEditScreen';

const Stack = createStackNavigator();

/** Navigator for the Staff Contact Directory and related view/edit screens. */
export default function DirectoryNavigator() {
  return (
    <Stack.Navigator initialRouteName='directory' screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='directory'
        component={DirectoryScreen}
      />
      <Stack.Screen
        name='view'
        component={PersonViewScreen}
      />
      <Stack.Screen
        name='edit'
        component={PersonEditScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
});