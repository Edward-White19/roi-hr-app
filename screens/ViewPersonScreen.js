import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';

export default function ViewPersonScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ViewPerson Screen</Text>
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
    fontSize: 18,
    marginBottom: 20,
  },
});