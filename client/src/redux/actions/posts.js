import * as api from '../../api/index.js';
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from '../constants/actionTypes';
import { errorNF } from './notificationsAction.js';


export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    dispatch(errorNF(error.message));
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
      dispatch(errorNF(error.message));
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
      dispatch(errorNF(error.message));
  }
};

export const updatePDF = (id,selectedFile) => async (dispatch) => {
  try {

    const { data } = await api.updatePDF(id,selectedFile);
    

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
      dispatch(errorNF(error.message));
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
      dispatch(errorNF(error.message));
  }
};
