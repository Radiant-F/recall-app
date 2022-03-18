import * as API from '../../utils/APIs';
import {AUTH_TYPE, LOADING, SIGNIN, SIGNUP} from '../actionTypes';
import errorHandler from './ErrorHandler';
import EncryptedStorage from 'react-native-encrypted-storage';

export const postSignIn = (formData, navigation) => async dispatch => {
  dispatch({type: LOADING, payload: true});
  try {
    const {data} = await API.signIn(formData);
    navigate(formData, dispatch, navigation, data);
  } catch (error) {
    errorHandler(error, dispatch, 'Data tidak ditemukan');
  }
};

export const postSignUp = (formData, navigation) => async dispatch => {
  dispatch({type: LOADING, payload: true});
  try {
    const {data} = await API.signUp(formData);
    dispatch({type: AUTH_TYPE, payload: true});
    navigate(formData, dispatch, navigation, data, 'SIGNUP');
  } catch (error) {
    errorHandler(error, dispatch, 'Data tidak ditemukan');
  }
};

const navigate = (formData, dispatch, navigation, data, signup) => {
  EncryptedStorage.setItem('empas', JSON.stringify(formData));
  if (signup) {
    dispatch({type: SIGNUP, payload: data});
  } else dispatch({type: SIGNIN, payload: data});
  setTimeout(() => {
    navigation.replace('Dashboard');
    dispatch({type: LOADING, payload: false});
  }, 1000);
};
