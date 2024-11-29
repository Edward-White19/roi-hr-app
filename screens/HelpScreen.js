import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SegmentedButtons, Surface, Text, useTheme } from 'react-native-paper';
import RoiHeader from '../components/RoiHeader';
import { ScrollView } from 'react-native-web';
import RoiBackdrop from '../components/RoiBackdrop';

/**
 * Help screen, providing support for the user in
 * understanding the application and how it works.
*/
export default function HelpScreen(props) {
  /** Material UI theme. */
  const theme = useTheme();
  /** State for text size parameter. */
  const [fontSize, setFontSize] = useState(1);
  /** Text header and body font size. */
  const size = textSizeSets[fontSize];

  return (
    <RoiBackdrop>
      {/* Header */}
      <RoiHeader title='Help' />

      {/* Font Size Setting */}
      <Surface elevation={1} style={styles.surfaceSizeSetting}>
        <Text
          variant='bodySmall'
          style={{
            ...styles.textSizeSettingLabel,
            fontSize: size.body,
            lineHeight: size.body + 8,
          }}
        >Text Size</Text>
        <SegmentedButtons
          value={fontSize}
          onValueChange={setFontSize}
          style={styles.segmentedButtonsSizeSetting}
          buttons={[
            { value: 0, label: 'Small' },
            { value: 1, label: 'Normal' },
            { value: 2, label: 'Large' }
          ]}
        />
      </Surface>

      {/* Scrollable Help Information */}
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollMain}>
        {
          // Generate content sections.
          pageContent.map(({ header, body }, index) => (
            <Surface
              key={index}
              style={styles.surfaceSection}
              elevation={1}
            >
              <Text
                variant='headlineMedium'
                style={{
                  ...styles.textSectionHeader,
                  color: theme.colors.primary,
                  fontSize: size.header,
                  lineHeight: size.header + 8,
                }}
              >{header}</Text>
              <Text
                variant='bodyLarge'
                style={{
                  ...styles.textSectionBody,
                  fontSize: size.body,
                  lineHeight: size.body + 8,
                }}
              >{body}</Text>
            </Surface>
          ))
        }
      </ScrollView>
    </RoiBackdrop>
  )
}

/** Text header and body font sizes. */
const textSizeSets = [
  { header: 24, body: 14 },
  { header: 28, body: 16 },
  { header: 32, body: 20 }
];

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
    body: `You can update an existing staff member's information by navigating to their profile and selecting the "Edit" option. `
      + `Make the necessary changes and ensure to save them to keep the directoy current.`
  },
  {
    header: `4. Delete Staff Entry`,
    body: `To remove a staff member from the directory, go to their profile, tap the "Delete" button, and confirm the action. `
      + `This will permanently remove the staff member from the directory.`
  },
];

/** Stylesheet. */
const styles = StyleSheet.create({
  surfaceSizeSetting: {
    width: '100%',
    height: 118,
    padding: 20,
    rowGap: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  segmentedButtonsSizeSetting: {
    width: '100%',
    maxWidth: 500,
  },
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
  textSizeSettingLabel: {
    fontWeight: 'bold',
  },
  textSectionHeader: {
    textAlign: 'left',
    textAlignVertical: 'top',
    fontWeight: 'bold',
  },
  textSectionBody: {
    textAlign: 'left',
    textAlignVertical: 'top',
    fontWeight: 'normal',
  }
});