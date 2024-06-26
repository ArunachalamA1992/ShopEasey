import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SET_ASYNC,
  SET_COMPLETE_PROFILE,
  SET_COUNTRY_CODE,
  SET_DATA_COUNT,
  SET_NOTIFICATION_COUNT,
  SET_ONBOARD,
  SET_USER_DATA,
} from './UserActionTypes';

const initialState = {
  userData: {},
  profile_complete: {
    resume: {},
    skills: [],
    details: {},
  },
  onboardVisible: false,
  notificationCount: 0,
  country: {},
  count: {
    wishlist: 0,
    cart: 0,
  },
};

const storeCartData = async UserState => {
  try {
    const jsonValue = JSON.stringify(UserState);
    await AsyncStorage.setItem('UserState', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      storeCartData({
        ...state,
        userData: action.payload,
      });
      return {
        ...state,
        userData: action.payload,
      };
    case SET_COMPLETE_PROFILE:
      storeCartData({
        ...state,
        profile_complete: {
          resume: action.payload.resume,
          skills: action.payload.skills,
          details: action.payload.details,
        },
      });
      return {
        ...state,
        profile_complete: {
          resume: action.payload.resume,
          skills: action.payload.skills,
          details: action.payload.details,
        },
      };
    case SET_ONBOARD:
      storeCartData({
        ...state,
        onboardVisible: action.payload,
      });
      return {
        ...state,
        onboardVisible: action.payload,
      };
    case SET_NOTIFICATION_COUNT:
      storeCartData({
        ...state,
        notificationCount: action.payload,
      });
      return {
        ...state,
        notificationCount: action.payload,
      };
    case SET_COUNTRY_CODE:
      storeCartData({
        ...state,
        country: action.payload,
      });
      return {
        ...state,
        country: action.payload,
      };
    case SET_DATA_COUNT:
      storeCartData({
        ...state,
        count: {
          wishlist: action.payload.wishlist,
          cart: action.payload.cart,
        },
      });
      return {
        ...state,
        count: {
          wishlist: action.payload.wishlist,
          cart: action.payload.cart,
        },
      };
    case SET_ASYNC:
      var {
        userData,
        profile_complete,
        onboardVisible,
        notificationCount,
        country,
        count,
      } = action.payload;
      return {
        ...state,
        userData,
        profile_complete,
        onboardVisible,
        notificationCount,
        country,
        count,
      };
    default:
      return state;
  }
};

export default UserReducer;
