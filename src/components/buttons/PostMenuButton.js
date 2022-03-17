import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PostMenuButton({onPress}) {
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={styles.view}>
        <Icon
          name="dots-horizontal"
          color="white"
          style={styles.icon}
          size={23}
        />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  view: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#00000024',
    // borderRadius: 40 / 2.5,
    borderTopRightRadius: 40 / 2.5,
    borderBottomLeftRadius: 40 / 2.5,
  },
  icon: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
