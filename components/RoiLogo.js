import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Button, IconButton } from 'react-native-paper';
import { Image } from 'react-native';

// 200 x 104.26
const roiLogoRed = require('../assets/logo-roi-red.jpg');
const roiLogoGrey = require('../assets/logo-roi-grey.jpg');

export default function RoiLogo({ isSmall }) {
  // Toggle between red and grey logo.
  const [isGrey, setGrey] = useState(false);
  const toggleColour = () => {
    setGrey((prev) => !prev);
  }

  const [width, height] = (isSmall) ? [80, 41.7] : [200, 104.26];
  const source = (isGrey) ? roiLogoGrey : roiLogoRed;

  return (
    <TouchableOpacity
      onPressIn={() => {
        toggleColour();
        console.log("Toggled logo colour.");
      }}
    >
      <Image
        source={source}
        style={{ width: width, height: height }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

});