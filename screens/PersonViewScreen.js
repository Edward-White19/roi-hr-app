import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Surface, useTheme } from 'react-native-paper';
import { fetchPersonById } from '../utils/api';
import RoiBackdrop from '../components/RoiBackdrop';
import RoiHeader from '../components/RoiHeader';
import Text, { fonts } from '../components/Text';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

/**
 * Screen for viewing details of a staff member.
*/
export default function PersonViewScreen(props) {
  /** ID of the person to view. */
  const { id } = props.route.params;

  /** Material UI theme. */
  const theme = useTheme();

  // #region State
  // Employee data to view.
  const [person, setPerson] = useState(null);

  // Whether offline mode is active.
  const [offline, setOffline] = useState(false);

  // Current error.
  const [error, setError] = useState(null);
  // #endregion

  // #region Database Fetch
  /** Fetches employee data. */
  const fetchDataPerson = async () => {
    try {
      const data = await fetchPersonById(id, setOffline);
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

  // If the 'person' object hasn't loaded yet, render a placeholder.
  if (person == null) {
    return (<LoadingPlaceholder text='Loading profile...' />);
  }
  // Else, load full view.
  return (
    <RoiBackdrop>
      <RoiHeader title={person.name} personView={true} />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollMain}>
        <Surface
          style={styles.surfaceContent}
          elevation={1}
        >
          {/* Fields */}
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
              onPress={props.navigation.goBack}
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

/** Display for a single field of the person object. */
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