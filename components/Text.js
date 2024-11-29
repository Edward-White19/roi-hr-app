import React from 'react'
import { StyleSheet } from 'react-native'
import { Text as PaperText } from 'react-native-paper';

/**
 * Text component that complies with the ROI style guide for font family (Trebuchet MS).
 * 
 * Includes additional fields:  
 * 'weight' for font weight ('normal' | 'bold' | undefined)  
 * 'color' for text color (ColorValue | undefined)  
 * 'size' for font size (Number | undefined)  
 * 'textAlign' for horizontal text alignment ('auto' | 'center' | 'left' | 'right' | 'justify' | undefined)  
 * 'textAlignVertical' for vertical text alignment ('auto' | 'center' | 'bottom' | 'top' | undefined)
*/
export default function Text(props) {
  const {
    numberOfLines,
    ellipsizeMode,
    variant,
    children,
    style,
    color,
    fontWeight,
    fontSize,
    textAlign,
    textAlignVertical,
  } = props;

  return (
    <PaperText
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      variant={variant}
      style={{
        ...fonts.trebuchetMS,
        fontWeight: fontWeight,
        color: color,
        fontSize: fontSize,
        lineHeight: fontSize + 8,
        textAlign: textAlign,
        textAlignVertical: textAlignVertical,
        ...style,
      }}
    >
      {children}
    </PaperText>
  )
}

/** Default stylesheet with font. */
export const fonts = StyleSheet.create({
  trebuchetMS: {
    fontFamily: 'Trebuchet MS',
  }
});
