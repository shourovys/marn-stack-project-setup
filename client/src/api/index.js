const axios = require("axios");
const baseUrl = "http://localhost:4000/auth";
export const sineUpApi = (formData) =>
  axios.post(`${baseUrl}/sineUp`, formData);

export const logInApi = (formData) => axios.post(`${baseUrl}/login`, formData);

export const isEmailAvailableApi = (email) =>
  axios.post(`${baseUrl}/email-available`, email);




const url = 'http://localhost:4000/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePDF = (id,selectedFile) => axios.patch(`${url}/${id}/updateFile`,selectedFile);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);