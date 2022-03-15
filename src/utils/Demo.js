import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import React, {useState} from 'react';
import {SwipeablePanel} from 'rn-swipeable-panel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../components/Gap';

export default function Demo() {
  const [isPanelActive, setIsPanelActive] = useState(false);

  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    <View style={{flex: 1}}>
      <Button title="open panel" onPress={() => setIsPanelActive(true)} />
      <SwipeablePanel
        style={styles.viewPanel}
        fullWidth
        onClose={() => setIsPanelActive(false)}
        isActive={isPanelActive}>
        <View style={styles.viewPanelBar}>
          <Text>Comments</Text>
          <Icon
            name="close"
            size={24}
            onPress={() => setIsPanelActive(false)}
          />
        </View>
        <View style={styles.viewCommentForm}>
          <View style={styles.panelPP}>
            <Icon name="account" size={40} />
          </View>
          <Gap width={10} />
          <TextInput
            placeholder="Write a public comment..."
            // autoFocus
            underlineColorAndroid="black"
            style={{flex: 1}}
          />
        </View>
      </SwipeablePanel>
    </View>
  );
}

const styles = StyleSheet.create({
  viewCommentForm: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 1,
  },
  panelPP: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPanelBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
  },
  viewPanel: {
    maxWidth: 520,
  },
});
