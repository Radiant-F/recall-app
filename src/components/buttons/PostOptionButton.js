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

export default function PostOptionButton({
  onPress,
  icon = 'cog',
  title = 'Option',
  disabled,
}) {
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.view}>
        <Icon name={icon} size={32} color="black" />
        <Gap width={10} />
        {/* {disabled ? (
          <ActivityIndicator
            color="black"
            size="small"
            style={styles.loading}
          />
        ) : ( */}
        <Text style={{color: 'black'}}>{title}</Text>
        {/* )} */}
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
