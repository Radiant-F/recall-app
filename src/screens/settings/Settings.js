import {StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {
  CStatusBar,
  Header,
  PostOptionButton,
  Gap,
} from '../../components/exports';
import EncryptedStorage from 'react-native-encrypted-storage';
import colors from '../../utils/colors';
import {useDispatch} from 'react-redux';
import {THEME} from '../../redux/actionTypes';
import {useTranslation} from 'react-i18next';
import i18n from '../../utils/i18n/i18n';
const initI18n = i18n;

export default function Settings({navigation}) {
  const dispatch = useDispatch();
  const {background, selectedTheme} = colors();
  const notCurrentTheme = selectedTheme == 'light' ? 'dark' : 'light';
  const switchTheme = () => dispatch({type: THEME, payload: notCurrentTheme});

  const {t, i18n} = useTranslation();
  const notCurrentLang = i18n.language == 'id' ? 'en' : 'id';
  const switchLang = () => i18n.changeLanguage(notCurrentLang);

  function logout() {
    Alert.alert(
      '',
      `${t('Logout')}?`,
      [
        {
          text: `${t('Logout')}`,
          onPress: () => {
            EncryptedStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{name: 'Auth'}],
            });
          },
          style: 'destructive',
        },
        {text: `${t('Cancel')}`, style: 'cancel'},
      ],
      {cancelable: true},
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: background}}>
      <CStatusBar />
      <Header
        title={t('Settings')}
        leftIcon={'chevron-left'}
        onPressLeft={() => navigation.goBack()}
      />
      <PostOptionButton
        icon={selectedTheme == 'dark' ? 'weather-sunny' : 'weather-night'}
        title={`${t('Switch theme to')} ${t(notCurrentTheme)}`}
        onPress={switchTheme}
      />
      <PostOptionButton
        icon={'translate'}
        title={`${t('Switch language to')} ${t(notCurrentLang)}`}
        onPress={switchLang}
      />
      <PostOptionButton icon={'logout'} title={t('Logout')} onPress={logout} />
    </View>
  );
}
