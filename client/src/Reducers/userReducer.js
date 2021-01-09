import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  SUBSCRIPE_REQUEST,
  SUBSCRIPE_SUCCESS,
  SUBSCRIPE_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        user: {},
        loggedIn: false,
        subscription: {},
      };
      break;

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        loggedIn: true,
        subscription: action.payload.subscription,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loggedIn: false,
      };

    case LOGOUT:
      localStorage.removeItem("userInfo");
      return {
        user: {},
        loggedIn: false,
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        user: {},
        loading: true,
        subscription: {},
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        loggedIn: true,
        subscription: action.payload.subscriptions,
      };

    case REGISTER_FAIL:
      return {
        error: action.payload,
        loading: false,
        subscription: {},
      };

    default:
      return state;
      break;
  }
};

export const subscripeReducer = (
  state = { subscriptionResult: {} },
  action
) => {
  switch (action.type) {
    case SUBSCRIPE_REQUEST:
      return {
        ...state,
        loading: true,
        subscriptionResult: {},
      };
      break;

    case SUBSCRIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptionResult: action.payload,
      };

    case SUBSCRIPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
      break;
  }
};
