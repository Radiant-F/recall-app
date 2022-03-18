import {View, Button} from 'react-native';
import React from 'react';
import {Posts} from '../../components/exports';
import {CStatusBar} from '../../components/exports';
import colors from '../../utils/colors';
import {THEME} from '../../redux/actionTypes';
import {useDispatch} from 'react-redux';
export default function Dashboard({navigation}) {
  const dispatch = useDispatch();
  const {background, selectedTheme} = colors();
  return (
    <View style={{flex: 1, backgroundColor: background}}>
      <CStatusBar />
      <Button
        title={`current theme: ${selectedTheme}. tap to change`}
        onPress={() =>
          dispatch({
            type: THEME,
            payload: selectedTheme == 'dark' ? 'light' : 'dark',
          })
        }
      />
      <Posts navigation={navigation} />
    </View>
  );
}
