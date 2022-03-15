import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from './Gap';
import {SearchButton} from './exports';
import {useSelector} from 'react-redux';

export default function DBHeader({onPress}) {
  const {userData} = useSelector(state => state.auth);
  return (
    <View style={styles.viewHeader}>
      <TouchableNativeFeedback useForeground onPress={onPress}>
        <View style={styles.viewProfile}>
          <Icon name="account-circle" size={50} color="white" />
          <Gap width={10} />
          <View>
            <Text style={styles.textName}>{userData?.name}</Text>
            <Text style={styles.textEmail}>{userData?.email}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <Gap flex={1} />
      <SearchButton />
    </View>
  );
}

const styles = StyleSheet.create({
  viewProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4c4f52',
    borderRadius: 10,
    padding: 5,
    paddingRight: 35,
    paddingLeft: 20,
    elevation: 5,
    overflow: 'hidden',
  },
  textEmail: {
    color: 'grey',
  },
  textName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  viewHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    marginTop: 25,
  },
});
