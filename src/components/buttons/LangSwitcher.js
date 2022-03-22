import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {FlagIndo, FlagUS} from '../../assets/exports';
import {useTranslation} from 'react-i18next';
import i18n from '../../utils/i18n/i18n';
import colors from '../../utils/colors';
const initI18n = i18n;

export default function LangSwitcher() {
  const {text} = colors();
  const {i18n} = useTranslation();
  const notCurrentLang = i18n.language == 'id' ? 'en' : 'id';
  const switchLang = () => i18n.changeLanguage(notCurrentLang);
  return (
    <TouchableNativeFeedback useForeground onPress={switchLang}>
      <View style={styles.view}>
        {i18n.language == 'en' && <FlagIndo width={35} height={25} />}
        {i18n.language == 'id' && <FlagUS width={35} height={25} />}
        <Text style={{color: text}}>{notCurrentLang.toUpperCase()}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
    width: 65,
    justifyContent: 'space-between',
    paddingRight: 7.5,
    alignItems: 'center',
  },
});
