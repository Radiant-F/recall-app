import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {postSignIn} from '../../redux/actions/auth';
import {CStatusBar} from '../../components/exports';
import {THEME} from '../../redux/actionTypes';
import colors from '../../utils/colors';

export default function Splash({navigation}) {
  const {background, postCard, selectedTheme, subtext, text} = colors();
  const dispatch = useDispatch();
  useEffect(() => {
    updateSession();
  }, []);
  async function updateSession() {
    const session = await EncryptedStorage.getItem('empas');
    if (session) {
      const formData = JSON.parse(session);
      dispatch(postSignIn(formData, navigation));
    } else return setTimeout(() => navigation.replace('Auth'), 2000);
  }

  return (
    <View style={styles.container(background)}>
      <CStatusBar />

      <ActivityIndicator
        size="large"
        color={selectedTheme == 'dark' ? 'white' : 'black'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: background => ({
    backgroundColor: background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
