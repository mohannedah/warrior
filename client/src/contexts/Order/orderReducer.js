import {
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from "../../constants/orderConstants";

const orderReducer = (state, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        shippingAddress: action.payload,
        entered: true,
      };

    case PLACE_ORDER_FAIL:
      return {
        ...state,
        entered: false,
        error: action.payload,
      };

      break;

    default:
      return {
        state,
      };
      break;
  }
};

export default orderReducer;
