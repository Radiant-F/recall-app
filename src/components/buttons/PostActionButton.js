import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';

export default function PostActionButton({
  onPress,
  iconName = 'thumb-up-outline',
}) {
  const {background, text, selectedTheme} = colors();
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={styles.viewButton(background, selectedTheme)}>
        <Icon name={iconName} size={20} style={styles.icon} color={text} />
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
  viewButton: (backgroundColor, selectedTheme) => ({
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    elevation: 3,
    backgroundColor,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: selectedTheme == 'dark' ? 'transparent' : 'grey',
  }),
});
