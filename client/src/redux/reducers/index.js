import { combineReducers } from 'redux';
import notificationsReducer from './notificationsReducer';
import posts from './posts';

export const reducers = combineReducers({ posts,notifications:notificationsReducer });
