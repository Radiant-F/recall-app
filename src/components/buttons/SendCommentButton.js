import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

export default function SendCommentButton({onPress}) {
  const {panelLoading} = useSelector(state => state.utils);
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={styles.view}>
        {panelLoading ? (
          <ActivityIndicator size="small" style={styles.icon} color="black" />
        ) : (
          <Icon name="send" size={23} color="dodgerblue" style={styles.icon} />
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  view: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
  },
});
