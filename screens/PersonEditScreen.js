import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import { addPerson, fetchDepartments, fetchPersonById, updatePerson } from '../utils/api';
import { Dropdown } from 'react-native-paper-dropdown';
import RoiBackdrop from '../components/RoiBackdrop';
import RoiHeader from '../components/RoiHeader';

/**
 * Screen for editing the details of a staff member, or adding a new staff member.
 * 
 * Providing an ID less than 0 sets this screen to 'Add' mode.
*/
export default function PersonEditScreen(props) {
  /** ID of the person to edit. */
  const { id, refreshList } = props.route.params;
  /** Whether the page is in Edit or Add mode. */
  const isEditMode = (id >= 0);

  // #region States
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
  // #endregion

  // #region Database Fetch
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

  // #region Database Post/Put
  async function handleSubmit() {
    try {
      const updatedPerson = { ...person };
      if (id < 0) {
        await addPerson(updatedPerson);
      } else {
        await updatePerson(id, updatedPerson);
      }
      refreshList();
      props.navigation.goBack();
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
  };
  // #endregion

  // #region Navigation
  /** Navigates to the main Staff Contact Directory screen. */
  function showDirectory() {
    props.navigation.navigate('view-all');
  }
  // #endregion

  return (
    <RoiBackdrop>
      <RoiHeader title={((isEditMode) ? 'Edit' : 'Add') + ' Staff'} />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollMain}>
        <Surface elevation={1} style={styles.surfaceContent}>
          <View style={styles.viewContent}>
            <TextInput
              label="Name"
              value={person.name}
              placeholder='e.g. Jenny Smith'
              onChangeText={(text) => setPerson({ ...person, name: text })}
              mode="outlined"
              keyboardType='default'
              textContentType='name'
              style={styles.inputField}
            />
            <Dropdown
              label="Department"
              mode="outlined"
              value={person.departmentId}
              placeholder='Select Department...'
              onSelect={(id) => setPerson({ ...person, departmentId: id })}
              options={departments.map((department) => ({
                label: department.name,
                value: department.id,
              }))}
              menuContentStyle={styles.inputField}
            />
            <TextInput
              label="Phone"
              value={person.phone}
              placeholder='01 2345 6789'
              onChangeText={(text) => setPerson({ ...person, phone: text })}
              mode="outlined"
              keyboardType="numeric"
              textContentType='telephoneNumber'
              style={styles.inputField}
            />
            <TextInput
              label="Street"
              value={person.street}
              placeholder='e.g. 25 Paprika Street'
              onChangeText={(text) => setPerson({ ...person, street: text })}
              mode="outlined"
              keyboardType='default'
              textContentType='streetAddressLine1'
              style={styles.inputField}
            />
            <TextInput
              label="City"
              value={person.city}
              placeholder='e.g. Sydney'
              onChangeText={(text) => setPerson({ ...person, city: text })}
              mode="outlined"
              keyboardType='default'
              textContentType='addressCity'
              style={styles.inputField}
            />
            <TextInput
              label="State"
              value={person.state}
              placeholder='e.g. NSW'
              onChangeText={(text) => setPerson({ ...person, state: text })}
              mode="outlined"
              keyboardType='default'
              textContentType='addressState'
              style={styles.inputField}
            />
            <TextInput
              label="Postcode"
              value={person.zip}
              placeholder='0000'
              onChangeText={(text) => setPerson({ ...person, zip: text })}
              mode="outlined"
              keyboardType="numeric"
              textContentType='postalCode'
              style={styles.inputField}
            />
            <TextInput
              label="Country"
              value={person.country}
              placeholder='e.g. Australia'
              onChangeText={(text) => setPerson({ ...person, country: text })}
              mode="outlined"
              keyboardType='default'
              textContentType='countryName'
              style={styles.inputField}
            />

            {/* Buttons */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Button
                  mode="outlined"
                  icon="keyboard-return"
                  onPress={showDirectory}
                >
                  Cancel
                </Button>
              </View>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Button mode="contained" icon="update" onPress={handleSubmit}>
                  Submit
                </Button>
              </View>
            </View>

          </View>
        </Surface>
      </ScrollView>
    </RoiBackdrop>
  )
}

/** Stylesheet. */
const styles = StyleSheet.create({
  scrollMain: {
    paddingVertical: 40,
    rowGap: 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  surfaceContent: {
    width: '100%',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewContent: {
    rowGap: 20,
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputField: {
    width: '100%',
  },
});