import React, { useReducer } from "react";
import ProductContext from "./productContext";
import { productListReducer } from "./productListReducer";
import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SCREEN_REQUEST,
  PRODUCT_SCREEN_SUCCESS,
  PRODUCT_SCREEN_FAIL,
} from "../../constants/productConstants";

const ProductState = (props) => {
  const initialState = {
    products: [],
    error: null,
    loading: true,
    product: {},
  };

  const [state, dispatch] = useReducer(productListReducer, initialState);

  // Getting products from the database

  const getAllProducts = async () => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get("/api/products");
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response.message
          ? error.response.message
          : error.message,
      });
    }
  };

  const getProduct = async (id) => {
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

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        product: state.product,
        error: state.error,
        loading: state.loading,
        getAllProducts,
        getProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
