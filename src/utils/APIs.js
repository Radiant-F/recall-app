import axios from 'axios';

const url = 'https://memories-saya.herokuapp.com';
const config = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const fetchPosts = () => axios.get(url + `/posts`);
export const fetchPostsPerPage = page => axios.get(url + `/posts?page=${page}`);
export const fetchComment = (value, id, token) =>
  axios.post(`${url}/posts/${id}/commentPost`, value, config(token));
export const fetchPostsBySearch = searchQuery =>
  axios.get(url + `/posts/searchQuery=${searchQuery}`);
export const likeAPost = (id, token) =>
  axios.patch(`${url}/posts/${id}/likePost`, null, config(token));
export const createPost = formData =>
  axios.post(url + '/posts', formData, config);

export const signIn = formData => axios.post(url + '/user/signin', formData);
export const signUp = formData => axios.post(url + '/user/signup', formData);
