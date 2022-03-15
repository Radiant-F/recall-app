import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {SignIn, CStatusBar, Background, SignUp} from '../../components/exports';
import {useSelector} from 'react-redux';

export default function Auth({navigation}) {
  const {auth} = useSelector(state => state);
  return (
    <View style={{backgroundColor: '#2e3134', flex: 1}}>
      <CStatusBar />
      <View style={styles.container}>
        {auth.is_login && <SignIn navigation={navigation} />}
      </View>
      <ScrollView style={{overflow: 'visible'}}>
        <View style={styles.container}>
          {!auth.is_login && <SignUp navigation={navigation} />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    overflow: 'hidden',
  },
});
