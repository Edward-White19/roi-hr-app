import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Surface, Text, TextInput } from 'react-native-paper';
import { fetchDepartments, fetchPersonById } from '../utils/api';
import { Dropdown } from 'react-native-paper-dropdown';

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

  // #region Database Fetch
  const [person, setPerson] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    Department: { id: 1, name: '' },
    departmentId: '',
  });
  const [departments, setDepartments] = useState([]);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataPerson = async () => {
    if (id < 0) {
      return;
    }

    try {
      const data = await fetchPersonById(id);
      setPerson(data);
      console.log(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  const fetchDataDepartments = async () => {
    try {
      const data = await fetchDepartments();
      setDepartments(data);
      console.log(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  useEffect(() => {
    fetchDataPerson(id);
    fetchDataDepartments();
  }, []);
  // #endregion

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
            placeholder='e.g. Jenny Smith'
            onChangeText={(text) => setPerson({ ...person, name: text })}
            mode="outlined"
            keyboardType='default'
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Phone"
            value={person.phone}
            placeholder='01 2345 6789'
            onChangeText={(text) => setPerson({ ...person, phone: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Street"
            value={person.street}
            placeholder='e.g. 25 Paprika Street'
            onChangeText={(text) => setPerson({ ...person, street: text })}
            mode="outlined"
            keyboardType='default'
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="City"
            value={person.city}
            placeholder='e.g. Sydney'
            onChangeText={(text) => setPerson({ ...person, city: text })}
            mode="outlined"
            keyboardType='default'
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="State"
            value={person.state}
            placeholder='e.g. NSW'
            onChangeText={(text) => setPerson({ ...person, state: text })}
            mode="outlined"
            keyboardType='default'
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Postcode"
            value={person.zip}
            placeholder='0000'
            onChangeText={(text) => setPerson({ ...person, zip: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Country"
            value={person.country}
            placeholder='e.g. Australia'
            onChangeText={(text) => setPerson({ ...person, country: text })}
            mode="outlined"
            keyboardType='default'
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Department"
            value={person.departmentId}
            placeholder='1'
            onChangeText={(text) => setPerson({ ...person, departmentId: text })}
            mode="outlined"
            keyboardType='default'
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