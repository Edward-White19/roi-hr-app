import React from 'react'
import { roiColors } from '../styles/RoiStyles';
import { TouchableOpacity } from 'react-native';

export default function RoiButton({ label, variant, onPress }) {
  const backgroundColor = (variant === 'Grey') ? roiColors.red : roiColors.grey;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        color: roiColors.white,
        backgroundColor: backgroundColor,
        shadowColor: '#000000',
      }}
    >{label}</TouchableOpacity>
  )
}
