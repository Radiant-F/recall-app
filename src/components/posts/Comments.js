import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {SwipeablePanel} from 'rn-swipeable-panel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../Gap';
import {useDispatch, useSelector} from 'react-redux';
import {SWIPEABLE_PANEL} from '../../redux/actionTypes';
import {SendCommentButton} from '../exports';
import {commentPost} from '../../redux/actions/posts';

export default function Comments() {
  const {utils, auth} = useSelector(state => state);
  const {comments, active, postId} = utils.commentPanel;
  const {updater} = utils;
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const closePanel = () =>
    dispatch({
      type: SWIPEABLE_PANEL,
      payload: {active: false, comments: null, postId: null},
    });
  function submitComment() {
    if (!value) return console.log('komentar kosong');
    dispatch(commentPost({value}, postId, auth.token, comments, updater));
    setValue();
  }

  return (
    <SwipeablePanel
      closeOnTouchOutside
      onClose={closePanel}
      onPressClose={closePanel}
      style={styles.viewPanel}
      fullWidth
      isActive={active}>
      <View style={styles.viewPanelBar}>
        <Text style={styles.textPanelTitle}>Comments</Text>
        <Icon name="close" size={24} onPress={closePanel} />
      </View>
      <View style={styles.viewCommentForm}>
        <View style={styles.panelPP}>
          <Icon name="account" size={40} />
        </View>
        <Gap width={10} />
        <TextInput
          placeholder="Write a public comment..."
          underlineColorAndroid="black"
          style={{flex: 1}}
          onChangeText={setValue}
          onSubmitEditing={submitComment}
          autoFocus
        />
        <Gap width={10} />
        <SendCommentButton onPress={submitComment} />
      </View>
      <View style={{padding: 15}}>
        {comments &&
          comments.map((value, index) => (
            <View style={styles.viewComment} key={index}>
              <View style={styles.viewCommentPp}>
                <Icon name="account" size={27} />
              </View>
              <Gap width={10} />
              <Text>{value}</Text>
            </View>
          ))}
      </View>
      {!comments ||
        (comments.length < 1 && (
          <Text style={{textAlign: 'center'}}>Be the first comment!</Text>
        ))}
    </SwipeablePanel>
  );
}

const styles = StyleSheet.create({
  viewCommentPp: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewComment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textPanelTitle: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  viewCommentForm: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 1,
    alignItems: 'center',
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
