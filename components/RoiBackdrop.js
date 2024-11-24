import React from 'react'
import { ImageBackground } from 'react-native';

/** Image to repeat (tile) for the background. */
const roiBgImage = require('../assets/bg-grey-1x.png');

/** The default backdrop used across the application. */
export default function RoiBackdrop({ children, style }) {
  return (
    <ImageBackground
      source={roiBgImage}
      style={{ flex: 1, width: '100%', height: '100%', ...style }}
      resizeMode='repeat'
    >
      {children}
    </ImageBackground>
  )
}
