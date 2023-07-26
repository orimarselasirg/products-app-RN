/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

interface Props {
  backgroundStyling: boolean;
  backgroundColor?: string;
  top?: number;
  width?: number;
  height?: number;
  rotate?: string;
  styles?: StyleProp<ViewStyle>
}

export const Backgorund = ({styles, backgroundStyling, backgroundColor = 'red', height = 1200, rotate = '-70deg', top = -250, width = 1000}: Props) => {
  return (
    <View
      style={[backgroundStyling
        ? {...styles as any}
        : {position: 'absolute', backgroundColor, height, rotate, top, width, transform: [{rotate}]}]}
    />
  );
};
