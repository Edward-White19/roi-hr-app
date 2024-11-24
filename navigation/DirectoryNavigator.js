import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import DirectoryScreen from '../screens/DirectoryScreen';
import PersonViewScreen from '../screens/PersonViewScreen';
import PersonEditScreen from '../screens/PersonEditScreen';

/** Stack navigator to use. */
const Stack = createStackNavigator();

/** Navigator for the Staff Contact Directory and related view/edit screens. */
export default function DirectoryNavigator() {
  return (
    <Stack.Navigator initialRouteName={'view-all'} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={'view-all'}
        component={DirectoryScreen}
      />
      <Stack.Screen
        name={'view-one'}
        component={PersonViewScreen}
      />
      <Stack.Screen
        name={'edit-one'}
        component={PersonEditScreen}
      />
    </Stack.Navigator>
  );
}
