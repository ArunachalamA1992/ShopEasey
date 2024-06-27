import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './user/UserReducer';
import OrderReducer from './Order/OrderReducer';

const rootReducer = combineReducers({
  UserReducer: UserReducer,
  OrderReducer: OrderReducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
