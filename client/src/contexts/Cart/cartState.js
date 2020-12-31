import React, { useReducer, useEffect } from "react";
import CartContext from "./cartContext";
import cartReducer from "./cartReducer";
import {
  ADD_ITEMS,
  ADD_IEMS_FAIL,
  REMOVE_ITEMS,
} from "../../constants/cartConstants";
import axios from "axios";

const CartState = (props) => {
  const initialState = {
    cartItems: [],
  };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartInfo", JSON.stringify(state.cartItems));
  }, [state]);

  const addCart = async (id, qty) => {
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
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEMS, payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addCart,
        removeItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
