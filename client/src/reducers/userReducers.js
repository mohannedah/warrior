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
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
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

    default:
      return state;
  }
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        errors: false,
        success: false,
      };
      break;
    case UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        loggedIn: true,
        errors: false,
        success: true,
      };
      break;
    case UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
        errors: true,
        success: false,
      };
      break;

    default:
      return state;
  }
};

export const getProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
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

    default:
      return state;
      break;
  }
};
