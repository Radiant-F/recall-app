import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React from 'react';
import colors from '../../utils/colors';
import {
  Header,
  CStatusBar,
  Gap,
  ProfilePost,
  Comments,
  Menu,
  FloatingButton,
} from '../../components/exports';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Profile({navigation}) {
  const {email, name} = useSelector(state => state.auth.userData);
  const {background, text, postCard} = colors();

  function logout() {
    Alert.alert(
      '',
      'Logout?',
      [
        {
          text: 'Logout',
          onPress: () => {
            EncryptedStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{name: 'Auth'}],
            });
          },
          style: 'destructive',
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: background}}>
      <CStatusBar />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header
          title="Profile"
          leftIcon={'chevron-left'}
          onPressLeft={() => navigation.goBack()}
          rightIcon={'logout'}
          onPressRight={logout}
        />
        <View style={styles.container}>
          <View style={styles.viewProfile}>
            <View style={styles.viewPP(postCard)}>
              <Icon name="account" size={63} color={text} />
            </View>
            <Gap height={20} />
            <Text style={styles.textName(text)}>{name}</Text>
            <Gap height={10} />
            <Text style={styles.textEmail}>{email}</Text>
          </View>
          <ProfilePost />
        </View>
      </ScrollView>
      <Comments />
      <Menu navigation={navigation} />
      <FloatingButton onPress={() => navigation.navigate('PostForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  textName: color => ({
    fontWeight: 'bold',
    fontSize: 21,
    color,
  }),
  textEmail: {
    color: 'grey',
  },
  viewPP: backgroundColor => ({
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    backgroundColor,
  }),
  viewProfile: {
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
});
