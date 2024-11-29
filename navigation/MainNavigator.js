import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import HelpScreen from '../screens/HelpScreen';
import DirectoryNavigator from './DirectoryNavigator';

/** Bottom tab navigator to use. */
const Tab = createMaterialBottomTabNavigator();
/** Size of all bottom tab icons. */
const iconSize = 26;

/** Primary tab navigator of the application, displayed at the bottom of the screen. */
export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='home' color={color} size={iconSize} style={{ top: -4 }} />
          ),
        }}
      />
      <Tab.Screen
        name='directory'
        component={DirectoryNavigator}
        options={{
          tabBarLabel: 'View',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='people-alt' color={color} size={iconSize} style={{ top: -4 }} />
          ),
        }}
      />
      <Tab.Screen
        name='help'
        component={HelpScreen}
        options={{
          tabBarLabel: 'Help',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='question-mark' color={color} size={iconSize} style={{ top: -4 }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
