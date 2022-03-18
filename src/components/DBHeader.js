import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from './Gap';
import {SearchButton} from './exports';
import {useSelector} from 'react-redux';
import colors from '../utils/colors';

export default function DBHeader({onPress}) {
  const {userData} = useSelector(state => state.auth);
  const {postCard, text} = colors();
  return (
    <View style={styles.viewHeader}>
      <TouchableNativeFeedback useForeground onPress={onPress}>
        <View style={styles.viewProfile(postCard)}>
          <Icon name="account-circle" size={50} color={text} />
          <Gap width={10} />
          <View>
            <Text style={styles.textName(text)}>{userData?.name}</Text>
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
  viewProfile: backgroundColor => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor,
    borderRadius: 10,
    padding: 5,
    paddingRight: 35,
    paddingLeft: 20,
    elevation: 3,
    overflow: 'hidden',
  }),
  textEmail: {
    color: 'grey',
  },
  textName: color => ({
    color,
    fontWeight: 'bold',
    fontSize: 17,
  }),
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
