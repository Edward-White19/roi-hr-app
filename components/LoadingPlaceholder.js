import React from 'react'
import { StyleSheet } from 'react-native'
import { Surface } from 'react-native-paper';
import Text from './Text';

/** Surface to render when needed data is still loading. */
export default function LoadingPlaceholder({ text }) {
  if (text === undefined || text === null) {
    text = "Loading...";
  }

  return (
    <Surface elevation={1} style={styles.surfaceMain}>
      <Text variant='headlineSmall' style={styles.textLoading}>{text}</Text>
    </Surface>
  )
}

/** Stylesheet. */
const styles = StyleSheet.create({
  surfaceMain: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});
