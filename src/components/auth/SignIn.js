import {StyleSheet, Text, View, Button, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import FormInput from './FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {postSignIn} from '../../redux/actions/auth';
import {AuthButton, Gap} from '../exports';
import {AUTH_TYPE} from '../../redux/actionTypes';

export default function SignIn({navigation}) {
  const {utils} = useSelector(state => state);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({email: null, password: null});

  function signIn() {
    if (formData.email && formData.password) {
      dispatch(postSignIn(formData, navigation));
    } else return console.log('isi dengan benar');
  }

  return (
    <View style={styles.container}>
      <Gap height={40} />
      <Text style={styles.textTitle}>Let's sign you in.</Text>
      <Gap height={10} />
      <Text style={styles.textSubtitle}>Welcome back.</Text>
      <Text style={styles.textSubtitle}>You've been missed!</Text>
      <Gap height={50} />
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
      <View style={styles.viewSubmit}>
        <Text style={styles.textQustion}>
          Don't have any account?{'  '}
          <Text
            style={styles.textRegister}
            onPress={() => dispatch({type: AUTH_TYPE, payload: false})}>
            Register
          </Text>
        </Text>
        <Gap height={10} />
        <AuthButton title="Sign In" disabled={utils.loading} onPress={signIn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewSubmit: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: '100%',
  },
  container: {
    padding: 30,
    height: '100%',
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
