import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';
import { DIR_NAV_DIRECTORY } from '../navigation/DirectoryNavigator';

/**
 * Screen for viewing details of a staff member.
*/
export default function PersonViewScreen(props) {
  /** ID of the person to view. */
  const { id } = props.route.params;

  // #region Navigation
  /** Navigates to the main Staff Contact Directory screen. */
  function showDirectory() {
    props.navigation.navigate(DIR_NAV_DIRECTORY);
  }
  // #endregion

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Person View Screen</Text>
    </View>
  )
}

/** Stylesheet. */
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