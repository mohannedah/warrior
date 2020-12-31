import {
  ADD_ITEMS,
  ADD_IEMS_FAIL,
  REMOVE_ITEMS,
} from "../constants/cartConstants";
import axios from "axios";

export const addCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}?qty=${qty}`);

  dispatch({
    type: ADD_ITEMS,
    payload: {
      product: data._id,
      name: data.name,
      price: data.price,
      image: data.image,
      countInStock: data.countInStock,
      qty: Number(qty),
    },
  });

  localStorage.setItem("cartInfo", JSON.stringify(getState().cart.cartItems));
};

export const removeItem = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ITEMS, payload: id });
};
