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
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  PAY_ORDER_PAYPAL_REQUEST,
  PAY_ORDER_PAYPAL_FAIL,
  PAY_ORDER_PAYPAL_SUCCESS,
} from "../constants/orderConstants";
import axios from "axios";

export const saveShippingAddress = (
  name,
  address,
  country,
  city,
  postalCode
) => (dispatch, getState) => {
  dispatch({
    type: SHIPPING_ADDRESS,
    payload: { name, address, country, city, postalCode },
  });
  localStorage.setItem(
    "shippingAddress",
    JSON.stringify({ name, address, country, city, postalCode })
  );
};

export const setPayment = (data) => (dispatch) => {
  dispatch({ type: SET_PAYMENT_METHOD, payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const placeOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLACE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
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

export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
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

export const payOrder = (id, token) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAY_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };

    const { data } = await axios.put(`/api/order/${id}/pay`, { token }, config);
    dispatch({ type: PAY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: PAY_ORDER_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const payOrderWithPaypal = (id, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PAY_ORDER_PAYPAL_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/order/${id}/paywithpaypal`,
      { paymentResult },
      config
    );
    dispatch({ type: PAY_ORDER_PAYPAL_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: PAY_ORDER_PAYPAL_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_AN_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
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

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
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

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };
    const { data } = await axios.get(`/api/order/${id}/deliver`, config);
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: error.response ? error.response.data.msg : error.message,
    });
  }
};
