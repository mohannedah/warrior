import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../../constants/userConstants";
import {
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_RESET,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  SET_PAYMENT_METHOD,
  SHIPPING_ADDRESS,
  GET_AN_ORDER_REQUEST,
  GET_AN_ORDER_SUCCESS,
  GET_AN_ORDER_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
} from "../../constants/orderConstants";

export const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        loggedIn: true,
        token: action.payload.token,
      };
      break;

    case LOGIN_FAIL:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        loading: false,
        error: action.payload,
        loggedIn: false,
      };
      break;

    case LOGOUT:
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      return {
        ...state,
        loading: true,
        loggedIn: false,
        user: {},
      };
      break;

    case REGISTER_REQUEST:
      return {
        ...state,
        errors: false,
        loading: true,
      };
      break;

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: false,
        loggedIn: true,
        user: action.payload,
        token: action.payload.token,
      };
      break;

    case REGISTER_FAIL:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        loading: false,
        loggedIn: false,
        errors: true,
        error: action.payload,
        user: {},
      };
      break;

    case GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        user: {},
        token: {},
      };
      break;
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
      break;
    case GET_PROFILE_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
      break;
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        errors: false,
      };
      break;
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
        errors: false,
      };
      break;
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        errors: true,
      };
      break;

    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        placed: false,
      };
      break;

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        placed: true,
        loading: false,
      };
      break;

    case SHIPPING_ADDRESS:
      return {
        ...state,
        loading: false,
        shippingAddress: action.payload,
        entered: true,
      };
      break;

    case PLACE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        placed: false,
      };
      break;

    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
      break;

    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        evaluating: false,
      };
      break;

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        placed: true,
        evaluating: true,
      };
      break;

    case GET_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        evaluating: false,
      };
      break;

    case PAY_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;

    case PAY_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
      break;

    case PAY_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      };
      break;

    case PAY_ORDER_RESET:
      return {};
      break;

    case GET_AN_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;

    case GET_AN_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
      break;

    case GET_AN_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      break;

    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
      break;

    case GET_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;

    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: false,
        evaluating: false,
      };
      break;

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: true,
        evaluating: true,
      };
      break;

    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        evaluating: false,
      };
      break;

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateUser: action.payload,
      };
      break;

    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;

    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;

    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
      break;

    case GET_ALL_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
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
