import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormInput({onChangeText, placeholder, password, flex}) {
  const [showPass, setShowPass] = useState(true);
  return (
    <View style={{...styles.view(password), flex}}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="grey"
        selectionColor="white"
        secureTextEntry={password ? showPass : false}
      />
      {password && (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(null, null, 15)}
          useForeground
          onPress={() => setShowPass(!showPass)}>
          <View style={styles.viewPass}>
            <Icon
              name={showPass ? 'eye-outline' : 'eye-off-outline'}
              color="grey"
              size={20}
            />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewPass: {
    height: 45,
    width: 45,
    overflow: 'hidden',
    borderRadius: 45 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    color: 'white',
    flex: 1,
  },
  view: password => ({
    backgroundColor: '#3c4043',
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    paddingRight: password ? 5 : 15,
  }),
});
