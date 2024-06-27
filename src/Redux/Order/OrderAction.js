import {
  SET_LAST_ORDER,
  SET_LAST_ORDER_VISIBLE,
  SET_ORDER_MODAL_CANCEL_VISIBLE,
  SET_ORDER_MODAL_SUCCESS_VISIBLE,
} from './OrderActionTypes';

export const setOrderSuccessVisible = param => {
  return {
    type: SET_ORDER_MODAL_SUCCESS_VISIBLE,
    payload: param,
  };
};
export const setOrderCancelVisible = param => {
  return {
    type: SET_ORDER_MODAL_CANCEL_VISIBLE,
    payload: param,
  };
};
