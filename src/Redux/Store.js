import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './user/UserReducer';

const rootReducer = combineReducers({
  UserReducer: UserReducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
