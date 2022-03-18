import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from './Gap';
import colors from '../utils/colors';

export default function Header({
  leftIcon,
  title = 'Header',
  onPressLeft,
  rightIcon,
  onPressRight,
}) {
  const widthGap = leftIcon ? 15 : 25;
  const {background, text} = colors();
  return (
    <View style={styles.container(background)}>
      {leftIcon && (
        <TouchableNativeFeedback
          useForeground
          onPress={onPressLeft}
          background={TouchableNativeFeedback.Ripple(null, null, 20)}>
          <View style={styles.viewIcon}>
            <Icon name={leftIcon} size={27} color={text} style={styles.icon} />
          </View>
        </TouchableNativeFeedback>
      )}
      <Gap width={widthGap} />
      <Text style={styles.textTitle(text)}>{title}</Text>
      {rightIcon && (
        <TouchableNativeFeedback
          useForeground
          onPress={onPressRight}
          background={TouchableNativeFeedback.Ripple(null, null, 20)}>
          <View style={{...styles.viewIcon, marginRight: 5}}>
            <Icon
              name={rightIcon}
              size={27}
              color={'tomato'}
              style={styles.icon}
            />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: color => ({
    color,
    fontWeight: 'bold',
    fontSize: 17,
    flex: 1,
  }),
  icon: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  viewIcon: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
  },
  container: bg => ({
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    backgroundColor: bg,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  }),
});
