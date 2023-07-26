/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, StyleProp, ViewStyle } from 'react-native';

interface Props {
  imageWidth: number;
  imageHeight: number;
  styles?: StyleProp<ViewStyle>
}

export const LogoLogin = ({imageHeight = 50, imageWidth = 60, styles}:Props) => {
  return (
    <View style={{...styles as any, alignItems: 'center'}}>
      <Image
        source={require('../assets/react-logo-white.png')}
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      />
    </View>
  );
};
