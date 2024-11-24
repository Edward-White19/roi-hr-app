import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Surface, Text } from 'react-native-paper';
import { colours } from '../styles/RoiStyle';
import RoiBackdrop from '../components/RoiBackdrop';
import { ScrollView } from 'react-native-web';

const dummyData = [
  { id: 1, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 2, name: "Jenny skdfshdgfjhsdgf Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 3, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 4, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 5, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 6, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 7, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
  { id: 8, name: "Jenny Smith", department: "Human Resources", phone: "01 2345 6789" },
];

/**
 * Screen for viewing details of a staff member.
*/
export default function PersonViewScreen(props) {
  /** ID of the person to view. */
  const { id } = props.route.params;
  const person = dummyData.find((item) => item.id === id);

  // #region Navigation
  /** Navigates to the main Staff Contact Directory screen. */
  function showDirectory() {
    props.navigation.navigate('view-all');
  }
  // #endregion

  return (
    <RoiBackdrop>
      <Surface>
        <View>
          <Avatar.Icon icon='folder' size={72} />
        </View>
        <View>
          <Text>{person.name}</Text>
        </View>
      </Surface>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollMain}>
        <Surface
          style={styles.surfaceSection}
          elevation={1}
        >
          <PersonField label='Department' value={person.department} />
          <PersonField label='Phone' value={person.phone} />
        </Surface>
      </ScrollView>
    </RoiBackdrop>
  )
}

/** Information entry. */
function PersonField({ label, value }) {
  return (
    <View>
      <Text variant='headlineMedium' style={styles.textSectionHeader}>{label}</Text>
      <Text variant='bodyLarge' style={styles.textSectionBody}>{value}</Text>
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
  surfaceSection: {
    width: '100%',
    padding: 20,
    rowGap: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textSectionHeader: {
    textAlign: 'left',
    textAlignVertical: 'top',
    fontWeight: 'bold',
    color: colours.red,
  },
  textSectionBody: {
    textAlign: 'left',
    textAlignVertical: 'top',
    fontWeight: 'normal',
  }
});