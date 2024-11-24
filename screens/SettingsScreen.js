import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRoiTheme } from '../components/RoiThemeContext';
import { Surface, Switch, Text } from 'react-native-paper';
import RoiHeader from '../components/RoiHeader';

/** Inaccessible Settings screen, allowing users to toggle between light and dark modes. */
export default function SettingsScreen(props) {
  const { isDarkTheme, toggleTheme } = useRoiTheme();

  return (
    <Surface style={styles.container}>
      <RoiHeader title='Settings' />

      <View style={styles.switchContainer} secondary={true}>
        <Text variant="titleSmall" style={styles.subtitle}>
          Current Theme: {isDarkTheme ? "Dark" : "Light"}
        </Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </Surface>
  )
}

/** Stylesheet. */
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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