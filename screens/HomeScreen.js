import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Surface, Text } from 'react-native-paper';
import RoiLogo from '../components/RoiLogo';
import RoiBackdrop from '../components/RoiBackdrop';

/** Initial screen, greeting the user. */
export default function HomeScreen(props) {
  return (
    <RoiBackdrop style={styles.backdropMain}>
      <Surface style={styles.surfaceMain} elevation={1}>
        <RoiLogo />
        <Text variant='displayMedium' style={styles.textTitle}>
          HR Contact Management System
        </Text>
      </Surface>
    </RoiBackdrop>
  )
}

/** Stylesheet. */
const styles = StyleSheet.create({
  backdropMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surfaceMain: {
    width: '100%',
    padding: 20,
    rowGap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
