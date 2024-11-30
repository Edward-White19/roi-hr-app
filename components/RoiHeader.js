import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import RoiLogo from './RoiLogo';
import Text from './Text';

/**
 * Header at the top of the page, with (or without) the ROI logo.
 * 
 * @param title the title to display, as a string
 * @param personView whether to style for a main section or employee name, as a boolean
 */
export default function RoiHeader({ title, personView }) {
  if (personView === undefined) {
    personView = false;
  }

  return (
    <Surface style={styles.surfaceBanner} elevation={2}>
      {
        (personView) ? (
          <View style={styles.viewContent}>
            <Text variant='headlineSmall' style={styles.textHeader} ellipsizeMode='tail'>{title}</Text>
          </View>
        ) : (
          <View style={styles.viewContent}>
            <Text variant='headlineMedium' style={styles.textHeader}>{title}</Text>
            <RoiLogo isSmall={true} />
          </View>
        )
      }
    </Surface>
  )
}

const styles = StyleSheet.create({
  surfaceBanner: {
    width: '100%',
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContent: {
    width: '100%',
    padding: 20,
    columnGap: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHeader: {
    textAlign: 'left',
    fontWeight: 'bold',
  }
});
