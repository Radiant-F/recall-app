import {GET_POSTS} from '../actionTypes';

export default (state = {posts: null, searchPost: null}, action) => {
  switch (action.type) {
    case GET_POSTS:
      const postsData = action.payload;
      return {...state, posts: postsData};
    default:
      return state;
  }
};
