import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../utils/colors';

export default function SearchButton({onPress}) {
  const {postCard, text} = colors();
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={styles.viewButton(postCard)}>
        <Icon name="search" size={25} color={text} style={styles.icon} />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  viewButton: backgroundColor => ({
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor,
    elevation: 3,
  }),
});
