import axios from 'axios';
const url = 'https://memories-saya.herokuapp.com';
const config = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchPosts = () => axios.get(`${url}/posts`);
export const fetchPostsPerPage = page => axios.get(`${url}/posts?page=${page}`);
export const fetchComment = (value, id, token) =>
  axios.post(`${url}/posts/${id}/commentPost`, value, config(token));
export const fetchPostsBySearch = searchQuery =>
  axios.get(`${url}/posts/searchQuery=${searchQuery}`);
export const likeAPost = (id, token) =>
  axios.patch(`${url}/posts/${id}/likePost`, null, config(token));
export const createPostAPI = (formData, token) =>
  axios.post(`${url}/posts`, formData, config(token));
export const editPostAPI = (formData, token, id) =>
  axios.patch(`${url}/posts/${id}`, formData, config(token));
export const deletePostAPI = (id, token) =>
  axios.delete(`${url}/posts/${id}`, config(token));

export const signIn = formData => axios.post(`${url}/user/signin`, formData);
export const signUp = formData => axios.post(`${url}/user/signup`, formData);
