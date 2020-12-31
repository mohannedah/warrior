import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_SCREEN_REQUEST,
  PRODUCT_SCREEN_SUCCESS,
  PRODUCT_SCREEN_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  REVIEW_PRODUCT_REQUEST,
  REVIEW_PRODUCT_FAIL,
  REVIEW_PRODUCT_SUCCESS,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_FAIL,
  TOP_PRODUCTS_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const productActions = (keyword = "") => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/products/?keyword=${keyword}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const productAdminActions = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_ADMIN_REQUEST });

    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SCREEN_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_SCREEN_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: PRODUCT_SCREEN_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};

export const createProductAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};

export const updateProductAction = (id, update) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/products/edit/${id}/`,
      update,
      config
    );
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};

export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };
    const { data } = await axios.delete(`/api/products/delete/${id}`, config);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};

export const reviewProductAction = (id, comment, rating) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: REVIEW_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userInfo.user.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/products/${id}/reviews`,
      { comment, rating },
      config
    );
    dispatch({ type: REVIEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: REVIEW_PRODUCT_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};

export const topProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/products/top-3-products");
    dispatch({ type: TOP_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: TOP_PRODUCTS_FAIL,
      payload: error.response.data.msg
        ? error.response.data.msg
        : error.message,
    });
  }
};
