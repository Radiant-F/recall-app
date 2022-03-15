import {View} from 'react-native';
import React from 'react';

export default function Gap({
  width,
  height,
  margin,
  marginVertical,
  marginHorizontal,
  marginTop,
  marginLeft,
  flex,
}) {
  return (
    <View
      style={{
        width,
        height,
        margin,
        marginVertical,
        marginHorizontal,
        marginTop,
        marginLeft,
        flex,
      }}
    />
  );
}
