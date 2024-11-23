import React from 'react';
import { Text, Surface } from "react-native-paper";

export default function NotFoundScreen(props) {
  return (
    <Surface style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant='displaySmall'>Not-Found Screen</Text>
    </Surface>
  )
}
