import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRoiTheme } from '../components/RoiThemeContext';
import { Surface, Switch, Text } from 'react-native-paper';

export default function HelpScreen(props) {
  const { isDarkTheme, toggleTheme } = useRoiTheme();

  return (
    <Surface style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Help Screen
      </Text>
      <View style={styles.switchContainer} secondary={true}>
        <Text variant="titleSmall" style={styles.subtitle}>
          Current Theme: {isDarkTheme ? "Dark" : "Light"}
        </Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 20,
  },
  subtitle: {
    marginVertical: 16,
    fontSize: 16,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 30,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
  },
  switchLabel: {
    fontSize: 16,
  },
});