import React from 'react'
import { StyleSheet } from 'react-native'
import { Divider, Surface, Text } from 'react-native-paper';
import RoiLogo from '../components/RoiLogo';
import RoiBackdrop from '../components/RoiBackdrop';
import { View } from 'react-native-web';

/** Initial screen, greeting the user. */
export default function HomeScreen(props) {
  return (
    <RoiBackdrop style={styles.backdropMain}>
      <Surface style={styles.surfaceMain} elevation={1}>
        <RoiLogo />
        <Text variant='displayMedium' style={styles.textTitle}>
          HR Contact Management System
        </Text>
        <Divider horizontalInset={true} style={{ width: '100%' }} />
        <View style={styles.viewCopyright}>
          <Text variant='bodySmall' style={styles.textCopyright}>Developed by Edward White</Text>
          <Text variant='bodySmall' style={styles.textCopyright}>Red Opal Innovations © 2024</Text>
        </View>
      </Surface>
    </RoiBackdrop>
  )
}

/** Stylesheet. */
const styles = StyleSheet.create({
  backdropMain: {
    justifyContent: 'center',
  },
  surfaceMain: {
    width: '100%',
    padding: 20,
    rowGap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCopyright: {
    rowGap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
  },
  textCopyright: {
    textAlign: 'center',
  }
});
