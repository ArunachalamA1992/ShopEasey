import {
  SET_ASYNC,
  SET_COMPLETE_PROFILE,
  SET_COUNTRY_CODE,
  SET_DATA_COUNT,
  SET_NOTIFICATION_COUNT,
  SET_ONBOARD,
  SET_USER_DATA,
} from './UserActionTypes';

export const setUserData = param => {
  return {
    type: SET_USER_DATA,
    payload: param,
  };
};

export const setCompleteProfile = param => {
  return {
    type: SET_COMPLETE_PROFILE,
    payload: param,
  };
};

export const setAsync = param => {
  return {
    type: SET_ASYNC,
    payload: param,
  };
};

export const setOnBoardVisible = param => {
  return {
    type: SET_ONBOARD,
    payload: param,
  };
};

export const setNotificationCount = param => {
  return {
    type: SET_NOTIFICATION_COUNT,
    payload: param,
  };
};

export const setCountryCode = param => {
  return {
    type: SET_COUNTRY_CODE,
    payload: param,
  };
};

export const setDataCount = param => {
  return {
    type: SET_DATA_COUNT,
    payload: param,
  };
};
