import React from 'react';
import { Surface } from "react-native-paper";
import Text from '../components/Text';

export default function NotFoundScreen(props) {
  return (
    <Surface style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant='displaySmall'>Not-Found Screen</Text>
    </Surface>
  )
}
