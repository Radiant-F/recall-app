import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import React from 'react';
import {SignIn, CStatusBar, Background, SignUp} from '../../components/exports';
import {useSelector} from 'react-redux';
import colors from '../../utils/colors';

export default function Auth({navigation}) {
  const {auth} = useSelector(state => state);
  const {background} = colors();
  return (
    <View style={{backgroundColor: background, flex: 1}}>
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
