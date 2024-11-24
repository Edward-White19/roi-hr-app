import React from 'react'
import { StyleSheet } from 'react-native'
import { Surface, Text } from 'react-native-paper';
import RoiHeader from '../components/RoiHeader';
import { ScrollView } from 'react-native-web';
import RoiBackdrop from '../components/RoiBackdrop';
import { colours } from '../styles/RoiStyle';

/**
 * Help screen, providing support for the user in
 * understanding the application and how it works.
*/
export default function HelpScreen(props) {
  return (
    <RoiBackdrop>
      <RoiHeader title='Help' />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollMain}>
        {
          // Generate content sections.
          pageContent.map(({ header, body }, index) => (
            <Surface
              key={index}
              style={styles.surfaceSection}
              elevation={1}
            >
              <Text variant='headlineMedium' style={styles.textSectionHeader}>{header}</Text>
              <Text variant='bodyLarge' style={styles.textSectionBody}>{body}</Text>
            </Surface>
          ))
        }
      </ScrollView>
    </RoiBackdrop>
  )
}

/**
 * Text content for the user to read.
 * 
 * Current placeholder text was written by Jalal Alhaddad.
*/
const pageContent = [
  {
    header: `1. Staff Directory`,
    body: `The Staff Directory feature allows you to browse a list of all employees in the organisation. `
      + `You can search for specific staff members and view their detailed information, including their roles, contact details and departments.`
  },
  {
    header: `2. Add New Staff`,
    body: `This feature enables you to add a new staff member to the directory. `
      + `To do so, tap on the "+" icon or the "Add Staff" button, fill in the required details such as name, position, department, and contact information, and save the entry.`
  },
  {
    header: `3. Update Staff Information`,
    body: `You can update an existing staff member's information by navigating to their profile and selecting the "Edit" option.`
      + `Make the necessary changes and ensure to save them to keep the directoy current.`
  },
  {
    header: `4. Delete Staff Entry`,
    body: `To remove a staff member from the directory, go to their profile, tap the "Delete" button, and confirm the action.`
      + `This will permanently remove the staff member from the directory.`
  },
];

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