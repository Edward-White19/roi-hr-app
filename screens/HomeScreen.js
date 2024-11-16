import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Surface, Text } from 'react-native-paper';
import RoiLogo from '../components/RoiLogo';

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <RoiLogo />
        <Text variant='displayLarge' style={styles.text}>HR Contact Management System</Text>
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
  surface: {
    flex: 1,
    padding: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});