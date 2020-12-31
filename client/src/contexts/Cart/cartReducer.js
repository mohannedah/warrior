import React from "react";
import { ADD_ITEMS, REMOVE_ITEMS } from "../../constants/cartConstants";

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEMS:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
      break;

    case REMOVE_ITEMS:
      return {
        cartItems: state.cartItems.filter(
          (item) => action.payload !== item.product
        ),
      };

    default:
      return {
        state,
      };
      break;
  }
};

export default cartReducer;
