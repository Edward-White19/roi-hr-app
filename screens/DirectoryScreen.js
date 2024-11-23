import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';
import { DIR_NAV_EDIT, DIR_NAV_VIEW } from '../navigation/DirectoryNavigator';

/**
 * Screen for viewing the Staff Contact Directory.
 * 
 * From here, users can select a staff member to view or edit,
 * or add a new staff member.
*/
export default function DirectoryScreen(props) {
  // #region Navigation
  /** Navigates to the Add Person screen. */
  function showAddPerson() {
    props.navigation.navigate(DIR_NAV_EDIT, { id: -1 });
  }

  /** Navigates to the Edit Person screen. */
  function showEditPerson(id) {
    props.navigation.navigate(DIR_NAV_EDIT, { id: id });
  }

  /** Navigates to the View Person screen. */
  function showViewPerson(id) {
    props.navigation.navigate(DIR_NAV_VIEW, { id: id });
  }
  // #endregion

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Staff Contact Directory Screen</Text>
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
