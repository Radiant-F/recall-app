import {ToastAndroid} from 'react-native';
import {LOADING} from '../actionTypes';

export default function errorHandler(error, dispatch, message) {
  console.log(error.message);
  ToastAndroid.show(message, ToastAndroid.SHORT);
  dispatch({type: LOADING, payload: false});
}
