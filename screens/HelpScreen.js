import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Banner, SegmentedButtons, Surface, Text, useTheme } from 'react-native-paper';
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
  /** State for font size setting banner being visible. */
  const [fontSizeBannerVisible, setFontSizeBannerVisible] = useState(true);
  /** State for font size parameter. */
  const [fontSizeLevel, setFontSizeLevel] = useState(1);
  /** Font header and body size. */
  const fontSize = fontSizeSets[fontSizeLevel];

  return (
    <RoiBackdrop>
      {/* Header */}
      <RoiHeader title='Help' />

      {/* Font Size Setting */}
      <Banner
        elevation={1}
        style={styles.bannerSizeSetting}
        visible={fontSizeBannerVisible}
      >
        <View style={styles.viewSizeSetting}>
          <Text
            variant='bodySmall'
            style={{
              ...styles.textSizeSettingLabel,
              fontSize: fontSize.body,
              lineHeight: fontSize.body + 8,
            }}
          >Font Size</Text>
          <SegmentedButtons
            value={fontSizeLevel}
            onValueChange={setFontSizeLevel}
            style={styles.segmentedButtonsSizeSetting}
            density='medium'
            buttons={[
              { value: 0, label: 'Small' },
              { value: 1, label: 'Normal' },
              { value: 2, label: 'Large' }
            ]}
          />
        </View>
      </Banner>

      {/* Scrollable Help Information */}
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollMain}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const newOffset = event.nativeEvent.contentOffset.y;
          console.log(newOffset);
          //this.offset = newOffset;
        }}
      >
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
                  fontSize: fontSize.header,
                  lineHeight: fontSize.header + 8,
                }}
              >{header}</Text>
              <Text
                variant='bodyLarge'
                style={{
                  ...styles.textSectionBody,
                  fontSize: fontSize.body,
                  lineHeight: fontSize.body + 8,
                }}
              >{body}</Text>
            </Surface>
          ))
        }
      </ScrollView>
    </RoiBackdrop>
  )
}

/** Font header and body sizes. */
const fontSizeSets = [
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
  bannerSizeSetting: {
    width: '100%',
    height: 105,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSizeSetting: {
    width: '100%',
    height: '100%',
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