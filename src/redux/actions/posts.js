import * as API from '../../utils/APIs';
import {
  GET_POSTS,
  LOADING,
  MENU_PANEL,
  PANEL_LOADING,
  SWIPEABLE_PANEL,
  UPDATER,
} from '../actionTypes';
import errorHandler from './ErrorHandler';
import {ToastAndroid} from 'react-native';

export const getPosts = () => async dispatch => {
  dispatch({type: LOADING, payload: true});
  try {
    const {data} = await API.fetchPosts();
    if (data.length < 1) return errorHandler('data kosong', dispatch, 'Kosong');
    dispatch({type: LOADING, payload: false});
    dispatch({type: PANEL_LOADING, payload: false});
    dispatch({type: GET_POSTS, payload: data.data.reverse()});
    console.log('posts loaded');
  } catch (error) {
    errorHandler(error, dispatch, 'Check your connection');
  }
};

export const likePost =
  (id, curId, index, token, posts, updater) => async dispatch => {
    try {
      if (posts[index].likes.find(id => id == curId)) {
        posts[index].likes.filter(v => v != curId);
      } else posts[index].likes.push(curId);
      dispatch({type: GET_POSTS, payload: posts});
      await API.likeAPost(id, token);
      dispatch({type: UPDATER, payload: !updater});
    } catch (error) {
      errorHandler(error, dispatch, `Cannot like post`);
    }
  };

export const commentPost =
  (value, id, token, comments, updater) => async dispatch => {
    dispatch({type: PANEL_LOADING, payload: true});
    try {
      const {data} = await API.fetchComment(value, id, token);
      if (data.status == 'ok') {
        dispatch({type: PANEL_LOADING, payload: false});
        dispatch({
          type: SWIPEABLE_PANEL,
          payload: {
            active: true,
            comments: [...comments, value.value],
            postId: id,
          },
        });
        dispatch({type: UPDATER, payload: !updater});
      }
    } catch (error) {
      errorHandler(error, dispatch, 'Cannot comment post');
    }
  };

export const createPost = (formData, token, navigation) => async dispatch => {
  dispatch({type: LOADING, payload: true});
  try {
    const {data} = await API.createPostAPI(formData, token);
    if (data.status == 'ok') {
      ToastAndroid.show('Recall posted', ToastAndroid.SHORT);
      dispatch(getPosts());
      navigation.goBack();
    }
  } catch (error) {
    errorHandler(error, dispatch, 'Cannot create post');
  }
};

export const editPost = (formData, token, id, navigation) => async dispatch => {
  dispatch({type: LOADING, payload: true});
  try {
    const {data} = await API.editPostAPI(formData, token, id);
    if (data.status == 'ok') {
      ToastAndroid.show('Recall updated', ToastAndroid.SHORT);
      navigation.goBack();
      dispatch({type: MENU_PANEL, payload: {active: false, post: null}});
      dispatch(getPosts());
    }
  } catch (error) {
    errorHandler(error, dispatch, 'Cannot create post');
  }
};

export const deletePost = (id, token) => async dispatch => {
  dispatch({type: PANEL_LOADING, payload: true});
  try {
    const {data} = await API.deletePostAPI(id, token);
    if (data.message == 'Postingan telah dihapus') {
      ToastAndroid.show('Post deleted', ToastAndroid.SHORT);
      dispatch({type: MENU_PANEL, payload: {active: false, post: null}});
      dispatch(getPosts());
    }
  } catch (error) {
    errorHandler(error, dispatch, 'Cannot delete post');
  }
};
