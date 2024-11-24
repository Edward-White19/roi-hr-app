import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import RoiLogo from './RoiLogo';

export default function RoiHeader({ title }) {
  return (
    <Surface style={styles.surfaceBanner} elevation={5}>
      <View style={styles.viewContent}>
        <Text variant='headlineMedium' style={styles.textHeader}>{title}</Text>
        <RoiLogo isSmall={true} />
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  surfaceBanner: {
    width: '100%',
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
