import React from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import HelpScreen from '../screens/HelpScreen';
import DirectoryNavigator from './DirectoryNavigator';

const Tab = createMaterialBottomTabNavigator();
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
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='home' color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name='directory'
        component={DirectoryNavigator}
        options={{
          tabBarLabel: 'View',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='people-alt' color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name='help'
        component={HelpScreen}
        options={{
          tabBarLabel: 'Help',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='question-mark' color={color} size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

});