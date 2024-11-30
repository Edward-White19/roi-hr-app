import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SegmentedButtons, Surface, useTheme } from 'react-native-paper';
import RoiHeader from '../components/RoiHeader';
import RoiBackdrop from '../components/RoiBackdrop';
import Text, { fonts } from '../components/Text';

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
        {/* Label */}
        <View style={styles.viewSizeSettingLabel}>
          <Text
            variant='bodyLarge'
            fontWeight='bold'
            fontSize={size.body}
          >Text Size</Text>
        </View>

        {/* Buttons */}
        <SegmentedButtons
          value={fontSize}
          onValueChange={setFontSize}
          style={styles.segmentedButtonsSizeSetting}
          density='medium'
          buttons={[
            { value: 0, label: 'Small', labelStyle: fonts.trebuchetMS },
            { value: 1, label: 'Normal', labelStyle: fonts.trebuchetMS },
            { value: 2, label: 'Large', labelStyle: fonts.trebuchetMS }
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
              {/* Header */}
              <Text
                variant='headlineMedium'
                fontSize={size.header}
                color={theme.colors.primary}
                style={{
                  ...styles.textSectionHeader,
                }}
              >{header}</Text>

              {/* Body */}
              <Text
                variant='bodyLarge'
                fontSize={size.body}
                style={{
                  ...styles.textSectionBody,
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
  { header: 32, body: 18 }
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 15,
    rowGap: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  viewSizeSettingLabel: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
  },
  segmentedButtonsSizeSetting: {
    width: '100%',
    minWidth: 240,
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