import * as API from '../../utils/APIs';
import {LOADING, SIGNIN} from '../actionTypes';
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
    navigate(formData, dispatch, navigation, data);
  } catch (error) {
    errorHandler(error, dispatch, 'Data tidak ditemukan');
  }
};

const navigate = (formData, dispatch, navigation, data) => {
  EncryptedStorage.setItem('empas', JSON.stringify(formData));
  dispatch({type: LOADING, payload: false});
  dispatch({type: SIGNIN, payload: data});
  navigation.replace('Dashboard');
};
