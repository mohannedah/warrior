import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_RESET,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_RESET,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_RESET,
  SET_PAYMENT_METHOD,
  SHIPPING_ADDRESS,
  GET_AN_ORDER_REQUEST,
  GET_AN_ORDER_SUCCESS,
  GET_AN_ORDER_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  PAY_ORDER_PAYPAL_REQUEST,
  PAY_ORDER_PAYPAL_FAIL,
  PAY_ORDER_PAYPAL_SUCCESS,
  PAY_ORDER_PAYPAL_RESET,
} from "../constants/orderConstants";

export const shippingAddressReducer = (
  state = { shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case SHIPPING_ADDRESS:
      return {
        ...state,
        loading: false,
        shippingAddress: action.payload,
        entered: true,
      };
      break;

    default:
      return state;
      break;
  }
};

export const paymentMethodReducer = (
  state = { paymentMethod: null },
  action
) => {
  switch (action.type) {
    case SET_PAYMENT_METHOD:
      return {
        paymentMethod: action.payload,
      };
      break;

    default:
      return state;
      break;
  }
};

export const placeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        loading: false,
        placed: true,
        order: action.payload,
      };
    case PLACE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PLACE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const getOrderReducer = (
  state = { user: {}, shippingAddress: {}, order: {}, orderItems: [] },
  action
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        order: {},
        loading: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        user: action.payload.user,
        shippingAddress: action.payload.shippingAddress,
        orderItems: action.payload.orderItems,
      };
    case GET_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case PAY_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PAY_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_AN_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;

    case GET_AN_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
      break;

    case GET_AN_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      break;
    default:
      return state;
  }
};

export const getAllUsersOrdersReducer = (state = { allOrders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;

    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        allOrders: action.payload,
        loading: false,
      };
      break;

    case GET_ALL_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;

    case GET_ALL_ORDERS_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        ...state,
        loadingDeliver: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        loadingDeliver: false,
        delivered: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        ...state,
        loadingDeliver: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const payWithPaypalReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_PAYPAL_REQUEST:
      return {
        ...state,
        loadingPaypal: true,
        successPaypal: false,
      };
    case PAY_ORDER_PAYPAL_SUCCESS:
      return {
        ...state,
        successPaypal: true,
        loadingPaypal: false,
        order: action.payload,
      };
    case PAY_ORDER_PAYPAL_FAIL:
      return {
        ...state,
        error: action.payload,
        successPaypal: true,
        loadingPaypal: false,
      };
    case PAY_ORDER_PAYPAL_RESET:
      return {};
    default:
      return state;
  }
};
// export const orderListMyReducer = (state = { orders: [] }, action) => {
//   switch (action.type) {
//     case ORDER_LIST_MY_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_LIST_MY_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload,
//       };
//     case ORDER_LIST_MY_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case ORDER_LIST_MY_RESET:
//       return { orders: [] };
//     default:
//       return state;
//   }
// };

// export const orderListReducer = (state = { orders: [] }, action) => {
//   switch (action.type) {
//     case ORDER_LIST_REQUEST:
//       return {
//         loading: true,
//       };
//     case ORDER_LIST_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload,
//       };
//     case ORDER_LIST_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
