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
import axios from "axios";

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};

export const registerUser = (email, password, name, passwordConfirm) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: REGISTER_REQUEST });
    const { data } = await axios.post(
      "/api/users/register",
      { email, password, name, passwordConfirm },
      config
    );

    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};

export const logOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const getProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};

export const updateProfile = (email, password, name) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };

    const { data } = await axios.put(
      "/api/users/profile",
      { email, name, password },
      config
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};
