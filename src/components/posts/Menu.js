import {StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {useDispatch, useSelector} from 'react-redux';
import {MENU_PANEL} from '../../redux/actionTypes';
import {PostOptionButton} from '../exports';
import {deletePost} from '../../redux/actions/posts';
import colors from '../../utils/colors';
import {useTranslation} from 'react-i18next';

export default function Menu({navigation}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {auth, utils} = useSelector(state => state);
  const {active, post} = utils.menuPanel;
  const {postCard} = colors();
  const closePanel = () =>
    dispatch({type: MENU_PANEL, payload: {active: false, post: null}});
  function actionHandler(type) {
    if (type == 1) {
      Alert.alert(
        '',
        `${t('Delete Post')}?`,
        [
          {
            text: `${t('Delete')}`,
            onPress: () => dispatch(deletePost(post._id, auth.token)),
            style: 'destructive',
          },
          {text: `${t('Back')}`},
        ],
        {cancelable: true},
      );
    } else return navigation.navigate('PostForm', {post});
  }
  return (
    <SwipeablePanel
      isActive={active}
      onClose={closePanel}
      onlySmall
      fullWidth
      closeOnTouchOutside
      style={{backgroundColor: postCard}}>
      <PostOptionButton
        icon="pencil-outline"
        title={t('Edit Post')}
        onPress={actionHandler}
        disabled={utils.panelLoading}
      />
      <PostOptionButton
        icon="trash-can-outline"
        title={utils.panelLoading ? t('Deleting..') : t('Delete Post')}
        onPress={() => actionHandler(1)}
        disabled={utils.panelLoading}
      />
    </SwipeablePanel>
  );
}
