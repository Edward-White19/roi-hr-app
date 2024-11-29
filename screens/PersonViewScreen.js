import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-web';
import { Button, Surface, Text } from 'react-native-paper';
import { colours } from '../styles/RoiStyle';
import RoiBackdrop from '../components/RoiBackdrop';
import { fetchPersonById } from '../utils/api';
import { useEffect } from 'react';
import { useState } from 'react';
import RoiHeader from '../components/RoiHeader';

/**
 * Screen for viewing details of a staff member.
*/
export default function PersonViewScreen(props) {
  /** ID of the person to view. */
  const { id } = props.route.params;

  // #region Database Fetch
  const [person, setPerson] = useState({
    name: '',
    phone: '00 0000 0000',
    street: '',
    city: '',
    state: '',
    zip: '0000',
    country: '',
    Department: { id: 1, name: '' },
    departmentId: 1,
  });
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataPerson = async () => {
    try {
      const data = await fetchPersonById(id);
      setPerson(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  useEffect(() => {
    fetchDataPerson(id);
  }, []);
  // #endregion

  // #region Navigation
  /** Navigates to the main Staff Contact Directory screen. */
  function showDirectory() {
    props.navigation.navigate('view-all');
  }
  // #endregion

  return (
    <RoiBackdrop>
      <RoiHeader title={person.name} personView={true} />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollMain}>
        <Surface
          style={styles.surfaceContent}
          elevation={1}
        >
          <PersonField label='Department' value={person.Department.name} />
          <PersonField label='Phone' value={person.phone} />
          <PersonField label='Street' value={person.street} />
          <PersonField label='City' value={person.city} />
          <PersonField label='State' value={person.state} />
          <PersonField label='Postcode' value={person.zip} />
          <PersonField label='Country' value={person.country} />

          {/* Buttons */}
          <View style={{ width: '100%' }}>
            <Button
              mode='contained'
              icon="keyboard-return"
              onPress={showDirectory}
            >
              Back
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </RoiBackdrop>
  )
}

/** Information entry. */
function PersonField({ label, value }) {
  return (
    <View>
      <Text variant='labelLarge' style={styles.textFieldHeader}>{label}</Text>
      <Text variant='titleLarge' style={styles.textFieldBody}>{value}</Text>
    </View>
  );
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
    rowGap: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textFieldHeader: {
    textAlign: 'left',
    textAlignVertical: 'top',
    fontWeight: 'bold',
    color: colours.red,
  },
  textFieldBody: {
    textAlign: 'left',
    textAlignVertical: 'top',
    fontWeight: 'normal',
  }
});