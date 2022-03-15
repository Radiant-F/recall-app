import {GET_POSTS} from '../actionTypes';

export default (state = {posts: null, searchPost: null}, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {...state, posts: action.payload};
    default:
      return state;
  }
};
