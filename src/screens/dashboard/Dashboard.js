import {View} from 'react-native';
import React from 'react';
import {Posts} from '../../components/exports';
import {CStatusBar} from '../../components/exports';
import colors from '../../utils/colors';
export default function Dashboard() {
  const {background} = colors();
  return (
    <View style={{flex: 1, backgroundColor: background}}>
      <CStatusBar />
      <Posts />
    </View>
  );
}
