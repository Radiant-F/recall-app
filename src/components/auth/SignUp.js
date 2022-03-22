import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FormInput from './FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {postSignUp} from '../../redux/actions/auth';
import {AuthButton, Gap, LangSwitcher} from '../exports';
import {AUTH_TYPE} from '../../redux/actionTypes';
import colors from '../../utils/colors';
import {useTranslation} from 'react-i18next';

export default function SignUp({navigation}) {
  const {t} = useTranslation();
  const {utils} = useSelector(state => state);
  const dispatch = useDispatch();
  const {text} = colors();
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
      dispatch(postSignUp(formData, navigation));
    } else return console.log('isi dengan benar');
  }

  return (
    <View style={styles.container}>
      <LangSwitcher />
      <Text style={styles.textTitle(text)}>{t('Lets sign you up.')}</Text>
      <Gap height={10} />
      <Text style={styles.textSubtitle(text)}>{t('Welcome!')}</Text>
      <Gap height={50} />
      <View style={styles.viewTextInput}>
        <FormInput
          onChangeText={input => setFormData({...formData, firstName: input})}
          placeholder={t('First Name')}
          flex={1}
        />
        <Gap width={20} />
        <FormInput
          onChangeText={input => setFormData({...formData, lastName: input})}
          placeholder={t('Last Name')}
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
        placeholder={t('Password')}
        password={true}
      />
      <Gap height={20} />
      <FormInput
        onChangeText={input =>
          setFormData({...formData, confirmPassword: input})
        }
        placeholder={t('Confirm Password')}
        password={true}
      />
      <Gap height={50} />
      <Text style={styles.textQustion}>
        {t('Do you have any account?')}
        {'  '}
        <Text
          style={styles.textRegister(text)}
          onPress={() => dispatch({type: AUTH_TYPE, payload: true})}>
          {t('Login')}
        </Text>
      </Text>
      <Gap height={10} />
      <AuthButton
        title={t('Sign Up')}
        disabled={utils.loading}
        onPress={signIn}
      />
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
