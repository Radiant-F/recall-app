import * as API from '../../utils/APIs';
import {LOADING, SIGNIN} from '../actionTypes';
import errorHandler from './ErrorHandler';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import qs from 'qs';

export const postSignIn = (formData, navigation) => async dispatch => {
  // dispatch({type: LOADING, payload: true});
  try {
    const {data} = await API.signIn(formData);
    navigate(formData, dispatch, navigation, data);
  } catch (error) {
    errorHandler(error, dispatch, 'Data tidak ditemukan');
  }

  // var data = qs.stringify({
  //   email: formData.email,
  //   password: formData.password,
  // });
  // var config = {
  //   method: 'post',
  //   url: 'https://memories-saya.herokuapp.com/user/signin',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   data: data,
  // };

  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // var details = formData;
  // var formBody = [];
  // for (var property in details) {
  //   var encodedKey = encodeURIComponent(property);
  //   var encodedValue = encodeURIComponent(details[property]);
  //   formBody.push(encodedKey + '=' + encodedValue);
  // }
  // formBody = formBody.join('&');

  // fetch('https://memories-saya.herokuapp.com/user/signin', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: formBody,
  // })
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.log(err));

  // fetch('https://memories-saya.herokuapp.com/user/signin', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Accept: 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify(formData),
  // })
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.log(err));
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
