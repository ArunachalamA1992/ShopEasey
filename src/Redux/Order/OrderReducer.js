import {
  SET_ORDER_MODAL_CANCEL_VISIBLE,
  SET_ORDER_MODAL_SUCCESS_VISIBLE,
  SET_LAST_ORDER_VISIBLE,
  SET_LAST_ORDER,
} from './OrderActionTypes';

const initialState = {
  orderSuccessVisible: false,
  orderCancelVisible: false,
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_MODAL_SUCCESS_VISIBLE:
      return {
        ...state,
        orderSuccessVisible: action.payload,
      };
    case SET_ORDER_MODAL_CANCEL_VISIBLE:
      return {
        ...state,
        orderCancelVisible: action.payload,
      };
    default:
      return state;
  }
};

export default OrderReducer;
