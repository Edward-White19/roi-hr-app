import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native'
import { Button, Surface, TextInput, useTheme } from 'react-native-paper';
import { addPerson, fetchDepartments, fetchPersonById, updatePerson } from '../utils/api';
import { Dropdown } from 'react-native-paper-dropdown';
import RoiBackdrop from '../components/RoiBackdrop';
import RoiHeader from '../components/RoiHeader';
import Text, { fonts } from '../components/Text';

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
  /** Material theme. */
  const { colors } = useTheme();
  /** Field width, since the dropdown refuses to cooperate. */
  const fieldWidth = useWindowDimensions().width - 40;
  /** Style to use across all fields for dimensions. */
  const fieldStyle = { width: fieldWidth, backgroundColor: colors.elevation.level1 };

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
            {/* Name */}
            <TextInput
              label={<Text>Name</Text>}
              value={person.name}
              placeholder='e.g. Jenny Smith'
              onChangeText={(text) => setPerson({ ...person, name: text })}
              keyboardType='default'
              textContentType='name'
              mode='outlined'
              style={fieldStyle}
              contentStyle={fonts.trebuchetMS}
            />

            {/* Department */}
            <Dropdown
              label={<Text>Department</Text>}
              value={person.departmentId}
              placeholder='Select Department...'
              onSelect={(id) => setPerson({ ...person, departmentId: id })}
              options={departments.map((department) => ({
                label: department.name,
                value: department.id,
              }))}
              CustomDropdownInput={({ placeholder, selectedLabel, rightIcon }) => (
                <TextInput
                  label={<Text>Department</Text>}
                  value={selectedLabel}
                  placeholder={placeholder}
                  right={rightIcon}
                  mode='outlined'
                  style={fieldStyle}
                  contentStyle={fonts.trebuchetMS}
                />
              )}
              hideMenuHeader={true}
              mode='outlined'
              menuContentStyle={{ backgroundColor: colors.elevation.level2 }}
            />

            {/* Phone */}
            <TextInput
              label={<Text>Phone</Text>}
              value={person.phone}
              placeholder='01 2345 6789'
              onChangeText={(text) => setPerson({ ...person, phone: text })}
              keyboardType='numeric'
              textContentType='telephoneNumber'
              mode='outlined'
              style={fieldStyle}
              contentStyle={fonts.trebuchetMS}
            />

            {/* Street */}
            <TextInput
              label={<Text>Street</Text>}
              value={person.street}
              placeholder='e.g. 25 Paprika Street'
              onChangeText={(text) => setPerson({ ...person, street: text })}
              keyboardType='default'
              textContentType='streetAddressLine1'
              mode='outlined'
              style={fieldStyle}
              contentStyle={fonts.trebuchetMS}
            />

            {/* City */}
            <TextInput
              label={<Text>City</Text>}
              value={person.city}
              placeholder='e.g. Sydney'
              onChangeText={(text) => setPerson({ ...person, city: text })}
              keyboardType='default'
              textContentType='addressCity'
              mode='outlined'
              style={fieldStyle}
              contentStyle={fonts.trebuchetMS}
            />

            {/* State */}
            <TextInput
              label={<Text>State</Text>}
              value={person.state}
              placeholder='e.g. NSW'
              onChangeText={(text) => setPerson({ ...person, state: text })}
              keyboardType='default'
              textContentType='addressState'
              mode='outlined'
              style={fieldStyle}
              contentStyle={fonts.trebuchetMS}
            />

            {/* Postcode */}
            <TextInput
              label={<Text>Postcode</Text>}
              value={person.zip}
              placeholder='0000'
              onChangeText={(text) => setPerson({ ...person, zip: text })}
              keyboardType='numeric'
              textContentType='postalCode'
              mode='outlined'
              style={fieldStyle}
              contentStyle={fonts.trebuchetMS}
            />

            {/* Country */}
            <TextInput
              label={<Text>Country</Text>}
              value={person.country}
              placeholder='e.g. Australia'
              onChangeText={(text) => setPerson({ ...person, country: text })}
              keyboardType='default'
              textContentType='countryName'
              mode='outlined'
              style={fieldStyle}
              contentStyle={fonts.trebuchetMS}
            />

            {/* Buttons */}
            <View style={styles.viewButtons}>
              <Button
                mode='outlined'
                icon='keyboard-return'
                style={styles.buttonActions}
                labelStyle={fonts.trebuchetMS}
                onPress={showDirectory}
              >
                Cancel
              </Button>

              <Button
                mode='contained-tonal'
                icon='check'
                style={styles.buttonActions}
                labelStyle={fonts.trebuchetMS}
                onPress={handleSubmit}
              >
                Submit
              </Button>
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
  viewButtons: {
    width: '100%',
    columnGap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  buttonActions: {
    flex: 1,
    minWidth: 120,
  },
});