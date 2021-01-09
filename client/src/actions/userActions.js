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
import axios from "axios";

export const registerUserAction = (email, password, passwordConfirm) => async (
  dispatch
) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register",
      {
        email,
        password,
        passwordConfirm,
      },
      config
    );
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data ? error.response.data.msg : error.message,
    });
  }
};

export const loginUserAction = (email, password) => async (dispatch) => {
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
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data ? error.response.data.msg : error.message,
    });
  }
};

export const logOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const subscripeAction = (email, payment_method) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: SUBSCRIPE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };

    const { data } = await axios.put(
      "/api/users/subscripe",
      { email, payment_method },
      config
    );

    dispatch({ type: SUBSCRIPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBSCRIPE_FAIL,
      payload: error.response.data ? error.response.data.msg : error.message,
    });
  }
};
