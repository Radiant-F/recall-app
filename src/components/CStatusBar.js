import {StatusBar, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export default function CStatusBar() {
  const {selectedTheme} = useSelector(state => state.utils);
  return (
    <>
      <View style={{marginTop: StatusBar.currentHeight}} />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={selectedTheme == 'dark' ? 'light-content' : 'dark-content'}
      />
    </>
  );
}
