import {useSelector} from 'react-redux';
import * as API from '../../utils/APIs';
import {GET_POSTS, LOADING, SWIPEABLE_PANEL, UPDATER} from '../actionTypes';
import errorHandler from './ErrorHandler';

export const getPosts = () => async dispatch => {
  dispatch({type: LOADING, payload: true});
  try {
    const {data} = await API.fetchPosts();
    if (data.length < 1) return errorHandler('data kosong', dispatch, 'Kosong');
    dispatch({type: LOADING, payload: false});
    dispatch({type: GET_POSTS, payload: data.data});
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
    dispatch({type: LOADING, payload: true});
    try {
      const {data} = await API.fetchComment(value, id, token);
      if (data.status == 'ok') {
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
