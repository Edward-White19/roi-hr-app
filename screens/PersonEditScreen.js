import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';

/**
 * Screen for editing the details of a staff member, or adding a new staff member.
 * 
 * Providing an ID less than 0 sets this screen to 'Add' mode.
*/
export default function PersonEditScreen(props) {
  /** ID of the person to edit. */
  const { id } = props.route.params;
  /** Whether the page is in Edit or Add mode. */
  const isEditMode = (id >= 0);

  // #region Navigation
  /** Navigates to the main Staff Contact Directory screen. */
  function showDirectory() {
    props.navigation.navigate('view-all');
  }
  // #endregion

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Person Add/Edit Screen</Text>
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