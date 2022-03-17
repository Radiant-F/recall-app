import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from './Gap';

export default function Header({leftIcon, title = 'Header', onPressLeft}) {
  const widthGap = leftIcon ? 15 : 25;
  return (
    <View style={styles.container}>
      {leftIcon && (
        <TouchableNativeFeedback
          useForeground
          onPress={onPressLeft}
          background={TouchableNativeFeedback.Ripple(null, null, 20)}>
          <View style={styles.viewIcon}>
            <Icon name={leftIcon} size={27} color="white" style={styles.icon} />
          </View>
        </TouchableNativeFeedback>
      )}
      <Gap width={widthGap} />
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
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
  container: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
});
