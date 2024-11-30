import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-web';
import { Button, Surface, useTheme } from 'react-native-paper';
import RoiBackdrop from '../components/RoiBackdrop';
import { fetchPersonById } from '../utils/api';
import { useEffect } from 'react';
import { useState } from 'react';
import RoiHeader from '../components/RoiHeader';
import Text, { fonts } from '../components/Text';

/**
 * Screen for viewing details of a staff member.
*/
export default function PersonViewScreen(props) {
  /** ID of the person to view. */
  const { id } = props.route.params;
  /** Material UI theme. */
  const theme = useTheme();

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
          <PersonField theme={theme} label='Department' value={person.Department.name} />
          <PersonField theme={theme} label='Phone' value={person.phone} />
          <PersonField theme={theme} label='Street' value={person.street} />
          <PersonField theme={theme} label='City' value={person.city} />
          <PersonField theme={theme} label='State' value={person.state} />
          <PersonField theme={theme} label='Postcode' value={person.zip} />
          <PersonField theme={theme} label='Country' value={person.country} />

          {/* Buttons */}
          <View style={styles.viewButton}>
            <Button
              mode='contained'
              icon='keyboard-return'
              onPress={showDirectory}
              style={styles.buttonAction}
              labelStyle={fonts.trebuchetMS}
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
function PersonField({ label, value, theme }) {
  return (
    <View style={styles.viewField}>
      <Text
        variant='labelLarge'
        style={{ ...styles.textFieldHeader }}
        color={theme.colors.primary}
        fontWeight='bold'
      >{label}</Text>
      <Text
        variant='titleLarge'
        style={styles.textFieldBody}
      >{value}</Text>
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
  viewButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  buttonAction: {
    width: '100%',
    minWidth: 120,
  },
  viewField: {
    flexDirection: 'column',
    rowGap: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textFieldHeader: {
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  textFieldBody: {
    textAlign: 'left',
    textAlignVertical: 'top',
  }
});