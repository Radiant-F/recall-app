import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';

export default function FormInput({
  onChangeText,
  placeholder,
  password,
  flex,
  multiline,
  height = 50,
  defaultValue,
}) {
  const [showPass, setShowPass] = useState(true);
  const {postCard, text} = colors();
  return (
    <View style={{...styles.view(password, postCard), flex}}>
      <TextInput
        style={{
          ...styles.textInput,
          color: text,
          height,
        }}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="grey"
        selectionColor={text}
        secureTextEntry={password ? showPass : false}
        multiline={multiline}
        defaultValue={defaultValue}
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
  view: (password, backgroundColor) => ({
    backgroundColor,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    paddingRight: password ? 5 : 15,
    elevation: 3,
  }),
});
