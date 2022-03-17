import {AUTH_TYPE, SIGNIN, SIGNUP} from '../actionTypes';

export default (
  state = {token: null, userData: null, is_login: true},
  action,
) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.result,
      };
    case SIGNUP:
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.data,
      };
    case AUTH_TYPE:
      return {...state, is_login: action.payload};
    default:
      return state;
  }
};
