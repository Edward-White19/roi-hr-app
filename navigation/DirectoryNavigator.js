import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import DirectoryScreen from '../screens/DirectoryScreen';
import PersonViewScreen from '../screens/PersonViewScreen';
import PersonEditScreen from '../screens/PersonEditScreen';

// #region Global Constants
/** Navigation ID of Directory Screen. */
export const DIR_NAV_DIRECTORY = 'directory';
/** Navigation ID of Person View Screen. */
export const DIR_NAV_VIEW = 'view';
/** Navigation ID of Person Add/Edit Screen. */
export const DIR_NAV_EDIT = 'edit';
// #endregion

/** Stack navigator to use. */
const Stack = createStackNavigator();

/** Navigator for the Staff Contact Directory and related view/edit screens. */
export default function DirectoryNavigator() {
  return (
    <Stack.Navigator initialRouteName={DIR_NAV_DIRECTORY} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={DIR_NAV_DIRECTORY}
        component={DirectoryScreen}
      />
      <Stack.Screen
        name={DIR_NAV_VIEW}
        component={PersonViewScreen}
      />
      <Stack.Screen
        name={DIR_NAV_EDIT}
        component={PersonEditScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
});