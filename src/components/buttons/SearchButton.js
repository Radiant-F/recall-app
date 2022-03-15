import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function SearchButton({onPress}) {
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={styles.viewButton}>
        <Icon name="search" size={25} color="white" style={styles.icon} />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    height: '100%',
  },
  viewButton: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: '#4c4f52',
    elevation: 10,
  },
});
