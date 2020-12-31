import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_SCREEN_REQUEST,
  PRODUCT_SCREEN_SUCCESS,
  PRODUCT_SCREEN_FAIL,
} from "../../constants/productConstants";

export const productListReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
      break;

    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;

    case PRODUCT_SCREEN_REQUEST:
      return {
        ...state,
        loading: true,
        product: {},
      };

    case PRODUCT_SCREEN_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };

    case PRODUCT_SCREEN_FAIL:
      return {
        ...state,
        error: action.payload,
        product: {},
        loading: false,
      };
    default:
      return {
        state,
      };
  }
};
