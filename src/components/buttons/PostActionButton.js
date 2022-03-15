import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PostActionButton({
  onPress,
  iconName = 'thumb-up-outline',
}) {
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={styles.viewButton}>
        <Icon name={iconName} size={20} style={styles.icon} color="white" />
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
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    elevation: 3,
    backgroundColor: '#51575d',
    overflow: 'hidden',
  },
});
