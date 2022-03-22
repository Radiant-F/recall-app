import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../Gap';
import colors from '../../utils/colors';

export default function PostOptionButton({
  onPress,
  icon = 'cog',
  title = 'Option',
  disabled,
  iconColor,
}) {
  const {text} = colors();
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.view}>
        <Icon name={icon} size={32} color={iconColor ? iconColor : text} />
        <Gap width={10} />
        <Text style={{color: text}}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignSelf: 'center',
    flex: 1,
    marginRight: 42,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
});
