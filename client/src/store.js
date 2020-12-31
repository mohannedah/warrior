import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productReducer,
  deleteProductReducer,
  productListAdminReducer,
  createProductReducer,
  updateProductReducer,
  reviewProductReducer,
  topProductsReducer,
} from "./reducers/productListReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  userReducer,
  getProfileReducer,
  updateProfileReducer,
  registerUserReducer,
} from "./reducers/userReducers";
import {
  shippingAddressReducer,
  paymentMethodReducer,
  placeOrderReducer,
  payOrderReducer,
  getOrderReducer,
  getAllOrdersReducer,
  getAllUsersOrdersReducer,
  orderDeliverReducer,
  payWithPaypalReducer,
} from "./reducers/orderReducer";
const reducer = combineReducers({
  productList: productListReducer,
  indProduct: productReducer,
  cart: cartReducer,
  userInfo: userReducer,
  address1: shippingAddressReducer,
  payment1: paymentMethodReducer,
  order1: placeOrderReducer,
  profileReducer: getProfileReducer,
  updateReducer: updateProfileReducer,
  registerUser: registerUserReducer,
  payAnOrder: payOrderReducer,
  orderDetails: getOrderReducer,
  ordersInfo: getAllOrdersReducer,
  usersOrders: getAllUsersOrdersReducer,
  orderDeliver: orderDeliverReducer,
  deleteProduct: deleteProductReducer,
  productListAdmin: productListAdminReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  reviewProduct: reviewProductReducer,
  topProducts: topProductsReducer,
  payWithPaypal: payWithPaypalReducer,
});

const cartItemsFromStorage = [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  shippingAddress: { shippingAddressFromStorage },
  paymentMethod: paymentMethodFromStorage,
  user: { userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
