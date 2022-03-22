import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Demo(props) {
  const {t, i18n} = props.screenProps;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          margin: 20,
          fontSize: 30,
        }}>
        {t('Hey Yo Im at home')}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('en')} //Here I change the language to "en" English
          style={Styles.button}>
          <Text style={{color: '#fff'}}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('es')} //Here I change the language to "es" Spanish
          style={Styles.button}>
          <Text style={{color: '#fff'}}>ES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('de')} //Here I change the language to "de" German
          style={Styles.button}>
          <Text style={{color: '#fff'}}>DE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('id')} //Here I change the language to "id" Indonesia
          style={Styles.button}>
          <Text style={{color: '#fff'}}>ID</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  button: {
    backgroundColor: '#61e3a5',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
