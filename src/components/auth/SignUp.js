import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FormInput from './FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {postSignIn} from '../../redux/actions/auth';
import {AuthButton, Gap} from '../exports';
import {AUTH_TYPE} from '../../redux/actionTypes';

export default function SignUp({navigation}) {
  const {utils} = useSelector(state => state);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    confirmPassword: null,
    password: null,
  });

  function signIn() {
    if (
      formData.email &&
      formData.password &&
      formData.firstName &&
      formData.lastName &&
      formData.confirmPassword
    ) {
      dispatch(postSignIn(formData, navigation));
    } else return console.log('isi dengan benar');
  }

  return (
    <View style={styles.container}>
      <Gap height={40} />
      <Text style={styles.textTitle}>Let's sign you up.</Text>
      <Gap height={10} />
      <Text style={styles.textSubtitle}>Welcome!</Text>
      <Gap height={50} />
      <View style={styles.viewTextInput}>
        <FormInput
          onChangeText={input => setFormData({...formData, firstName: input})}
          placeholder="First Name"
          flex={1}
        />
        <Gap width={20} />
        <FormInput
          onChangeText={input => setFormData({...formData, lastName: input})}
          placeholder="Last Name"
          flex={1}
        />
      </View>
      <Gap height={20} />
      <FormInput
        onChangeText={input => setFormData({...formData, email: input})}
        placeholder="Email"
      />
      <Gap height={20} />
      <FormInput
        onChangeText={input => setFormData({...formData, password: input})}
        placeholder="Password"
        password={true}
      />
      <Gap height={20} />
      <FormInput
        onChangeText={input =>
          setFormData({...formData, confirmPassword: input})
        }
        placeholder="Confirm Password"
        password={true}
      />
      <Gap height={50} />
      <Text style={styles.textQustion}>
        Do you have any account?{'  '}
        <Text
          style={styles.textRegister}
          onPress={() => dispatch({type: AUTH_TYPE, payload: true})}>
          Login
        </Text>
      </Text>
      <Gap height={10} />
      <AuthButton title="Sign Up" disabled={utils.loading} onPress={signIn} />
      <Gap height={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewTextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewSubmit: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -10,
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 25,
  },
  container: {
    padding: 30,
    overflow: 'visible',
  },
  textQustion: {
    textAlign: 'center',
    color: 'grey',
  },
  textRegister: {
    color: 'white',
    fontWeight: 'bold',
  },
  textSubtitle: {
    color: 'white',
    fontSize: 20,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
});
