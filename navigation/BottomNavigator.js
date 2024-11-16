import React from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DirectoryScreen from '../screens/DirectoryScreen';
import AddPersonScreen from '../screens/AddPersonScreen';
import HelpScreen from '../screens/HelpScreen';

const Tab = createMaterialBottomTabNavigator();
const iconSize = 26;

export default function BottomNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='home' color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name='Directory'
        component={DirectoryScreen}
        options={{
          tabBarLabel: 'View',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='people-alt' color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name='Add'
        component={AddPersonScreen}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='add' color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name='Help'
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