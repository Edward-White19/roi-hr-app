import React from 'react'
import { Banner, Icon, useTheme } from 'react-native-paper';
import Text from './Text';

/** Banner to display when offline. */
export default function OfflineBanner({ visible }) {
  /** Material UI theme. */
  const theme = useTheme();

  return (
    <Banner
      visible={visible}
      icon={({ size }) => (
        <Icon source='alert' size={size} color={theme.colors.onError} />
      )}
      style={{
        width: '100%',
        backgroundColor: theme.colors.error
      }}
    >
      <Text variant='bodyLarge' color={theme.colors.onError}>
        {"Offline mode.\nCould not connect to the server."}
      </Text>
    </Banner>
  )
}
