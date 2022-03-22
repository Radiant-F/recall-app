import {StyleSheet, Text, View, Button, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import FormInput from './FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {postSignIn} from '../../redux/actions/auth';
import {AuthButton, Gap, LangSwitcher} from '../exports';
import {AUTH_TYPE} from '../../redux/actionTypes';
import colors from '../../utils/colors';
import {useTranslation} from 'react-i18next';

export default function SignIn({navigation}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {utils} = useSelector(state => state);
  const {text} = colors();
  const [formData, setFormData] = useState({email: null, password: null});

  function signIn() {
    if (formData.email && formData.password) {
      dispatch(postSignIn(formData, navigation));
    } else return console.log('isi dengan benar');
  }

  return (
    <View style={styles.container}>
      <LangSwitcher />
      <Text style={styles.textTitle(text)}>{t('Lets sign you in.')}</Text>
      <Gap height={10} />
      <Text style={styles.textSubtitle(text)}>{t('Welcome back.')}</Text>
      <Text style={styles.textSubtitle(text)}>{t('Youve been missed!')}</Text>
      <Gap height={50} />
      <FormInput
        onChangeText={input =>
          setFormData({...formData, email: input.trimEnd()})
        }
        placeholder="Email"
      />
      <Gap height={20} />
      <FormInput
        onChangeText={input => setFormData({...formData, password: input})}
        placeholder={t('Password')}
        password={true}
      />
      <View style={styles.viewSubmit}>
        <Text style={styles.textQustion}>
          {t('Dont have any account?')}
          {'  '}
          <Text
            style={styles.textRegister(text)}
            onPress={() => dispatch({type: AUTH_TYPE, payload: false})}>
            {t('Register')}
          </Text>
        </Text>
        <Gap height={10} />
        <AuthButton
          title={t('Sign In')}
          disabled={utils.loading}
          onPress={signIn}
        />
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
  textRegister: color => ({
    color,
    fontWeight: 'bold',
  }),
  textSubtitle: color => ({
    color,
    fontSize: 20,
  }),
  textTitle: color => ({
    fontWeight: 'bold',
    fontSize: 30,
    color,
  }),
});
