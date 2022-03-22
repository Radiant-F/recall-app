import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FloatingButton({
  onPress,
  icon = 'book-plus-multiple',
  absolute = true,
}) {
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={absolute ? styles.view : styles.regular}>
        <Icon name={icon} style={styles.icon} size={27} />
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
  regular: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    elevation: 3,
    overflow: 'hidden',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
  },
  view: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    elevation: 3,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
  },
});
