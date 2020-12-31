import React, { useContext, useReducer, useEffect } from "react";
import OrderContext from "./orderContext";
import orderReducer from "./orderReducer";
import UserContext from "../User/UserContext";
import axios from "axios";
import {
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_FAIL,
} from "../../constants/orderConstants";

const OrderState = (props) => {
  const initialState = {
    shippingAddress: {},
    entered: false,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(orderReducer, initialState);

  //   useEffect(() => {
  //
  //   }, [state]);

  const userContext = useContext(UserContext);
  const { user } = userContext;
  const saveShippingAddress = async (
    name,
    country,
    city,
    postalCode,
    address
  ) => {
    try {
      dispatch({ type: PLACE_ORDER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/address",
        { name, country, city, postalCode, address },
        config
      );
      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PLACE_ORDER_FAIL,
        payload: error.response.data.msg
          ? error.response.data.msg
          : error.response,
      });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        shippingAddress: state.shippingAddress,
        entered: state.entered,
        saveShippingAddress,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
