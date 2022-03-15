import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

export default function AuthButton({onPress, title = 'Title', disabled}) {
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.viewButton}>
        {disabled ? (
          <ActivityIndicator
            size="small"
            color="black"
            style={{marginTop: 15}}
          />
        ) : (
          <Text style={styles.textButton}>{title}</Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  textButton: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
  },
  viewButton: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
  },
});
