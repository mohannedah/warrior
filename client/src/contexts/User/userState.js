import React, { useReducer, useEffect } from "react";
import { userReducer } from "./userReducer";
import UserContext from "./UserContext";
import axios from "axios";
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
} from "../../constants/userConstants";
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  SET_PAYMENT_METHOD,
  SHIPPING_ADDRESS,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_RESET,
  GET_AN_ORDER_REQUEST,
  GET_AN_ORDER_SUCCESS,
  GET_AN_ORDER_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
} from "../../constants/orderConstants";

const UserState = (props) => {
  const initialState = {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
    users: [],
    loading: true,
    errors: false,
    error: {},
    loggedIn: false,
    token: null,
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    entered: false,
    paymentMethod: localStorage.getItem("PaymentMethod")
      ? JSON.parse(localStorage.getItem("PaymentMethod"))
      : null,
    order: {},
    placed: false,
    taxPrice: "0.00",
    shippingPrice: "0.00",
    success: false,
    evaluating: false,
    orders: [],
    updateUser: {},
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(state.user));
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(state.shippingAddress)
    );
    localStorage.setItem("PaymentMethod", JSON.stringify(state.paymentMethod));
  }, [state]);

  const loginUser = async (email, password) => {
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
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.message,
      });
    }
  };

  const registerUser = async (email, password, name, passwordConfirm) => {
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

  const getProfile = async (id) => {
    try {
      dispatch({ type: GET_PROFILE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
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

  const updateProfile = async (email, password, name, passwordConfirm, id) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/${id}`,
        { email, name, password, passwordConfirm },
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

  const saveShippingAddress = async (
    name,
    country,
    city,
    postalCode,
    address
  ) => {
    try {
      dispatch({
        type: SHIPPING_ADDRESS,
        payload: { name, country, city, postalCode, address },
      });
    } catch (error) {}
  };

  const setPayment = (data) => {
    dispatch({ type: SET_PAYMENT_METHOD, payload: data });
  };

  const placeOrder = async (order) => {
    try {
      dispatch({ type: PLACE_ORDER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      const { data } = await axios.post("/api/order", order, config);
      dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: PLACE_ORDER_FAIL,
        payload: error.response ? error.response.data.msg : error.message,
      });
    }
  };

  const getOrder = async (id) => {
    try {
      dispatch({ type: GET_ORDER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      const { data } = await axios.get(`/api/order/${id}`, config);
      dispatch({ type: GET_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: GET_ORDER_FAIL,
        payload: error.response ? error.response.data.msg : error.message,
      });
    }
  };

  const payOrder = async (id, token) => {
    try {
      dispatch({ type: PAY_ORDER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/order/${id}/pay`,
        { token },
        config
      );
      dispatch({ type: PAY_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: PAY_ORDER_FAIL,
        payload: error.response ? error.response.data.msg : error.message,
      });
    }
  };

  const getOrders = async () => {
    try {
      dispatch({ type: GET_AN_ORDER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      const { data } = await axios.get("/api/order/order", config);
      dispatch({ type: GET_AN_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_AN_ORDER_FAIL,
        payload: error.response ? error.response.data.msg : error.message,
      });
    }
  };

  const getAllUsers = async () => {
    try {
      dispatch({ type: GET_ALL_USERS_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      const { data } = await axios.get("/api/users", config);
      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_USERS_FAIL,
        payload: error.response ? error.response.data.msg : error.message,
      });
    }
  };

  const deleteUser = async (id) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      const { data } = await axios.delete(`/api/users/${id}`, config);
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response ? error.response.data.msg : error.message,
      });
    }
  };

  const getAllOrders = async () => {
    try {
      dispatch({ type: GET_ALL_ORDERS_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      };
      const { data } = await axios.get("/api/order", config);
      dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_ORDERS_FAIL,
        payload: error.response ? error.response.data.msg : error.message,
      });
    }
  };

  const getUserandUpdate = async (id, email, name, isAdmin) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/users/edit/${id}`,
        { email, name, isAdmin },
        config
      );
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response ? error.response.data.msg : error.message,
      });
    }
  };

  const logOut = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        loggedIn: state.loggedIn,
        loading: state.loading,
        errors: state.errors,
        entered: state.entered,
        paymentMethod: state.paymentMethod,
        shippingAddress: state.shippingAddress,
        order: state.order,
        shippingPrice: state.shippingPrice,
        taxPrice: state.taxPrice,
        placed: state.placed,
        success: state.success,
        evaluating: state.evaluating,
        orders: state.orders,
        updateUser: state.updateUser,
        getAllOrders,
        getUserandUpdate,
        deleteUser,
        getAllUsers,
        getOrders,
        dispatch,
        placeOrder,
        loginUser,
        logOut,
        registerUser,
        getProfile,
        updateProfile,
        saveShippingAddress,
        setPayment,
        getOrder,
        payOrder,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
