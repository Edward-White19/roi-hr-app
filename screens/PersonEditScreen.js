import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, TextInput } from 'react-native-paper';

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
      <Surface
        elevation={5}
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <TextInput
            label="Name"
            value={person.name}
            onChangeText={(text) => setPerson({ ...person, name: text })}
            mode="outlined"
            keyboardType=''
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Phone"
            value={person.phone}
            onChangeText={(text) => setPerson({ ...person, phone: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          // render={props => <TextInputMask {...props} mask="[00] [0000] [0000]" />}
          />
          <TextInput
            label="Street"
            value={person.street}
            onChangeText={(text) => setPerson({ ...person, street: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="City"
            value={person.city}
            onChangeText={(text) => setPerson({ ...person, city: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="State"
            value={person.state}
            onChangeText={(text) => setPerson({ ...person, state: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Postcode"
            value={person.zip}
            onChangeText={(text) => setPerson({ ...person, zip: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Country"
            value={person.country}
            onChangeText={(text) => setPerson({ ...person, country: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Department"
            value={person.department}
            onChangeText={(text) => setPerson({ ...person, department: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
        </ScrollView>
      </Surface>
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