import "./App.css";
import { Fragment } from "react";
import { Container } from "react-bootstrap";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Home from "./Screens/Home";
import ProductState from "./contexts/Product/productState";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import UserState from "./contexts/User/userState";
import loginScreen from "./Screens/loginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import UserListScreen from "./Screens/UserListScreen";
import OrderScreen from "./Screens/OrderScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductAdminScreen from "./Screens/ProductAdminScreen";
import OrdersAdminScreen from "./Screens/OrdersAdminScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CartState from "./contexts/Cart/cartState";
import OrderState from "./contexts/Order/OrderState";

function App() {
  return (
    <Router>
      <ProductState>
        <CartState>
          <UserState>
            <Header />
            <main>
              <Container>
                <Route path='/' component={Home} exact />
                <Route path='/product/:id' component={ProductScreen} exact />
                <Route path='/cart/:id?' component={CartScreen} exact />
                <Route path='/login' component={loginScreen} exact />
                <Route path='/register' component={RegisterScreen} exact />
                <Route path='/profile' component={ProfileScreen} exact />
                <Route path='/shipping' component={ShippingScreen} exact />
                <Route path='/payment' component={PaymentScreen} exact />
                <Route path='/placeOrder' component={PlaceOrderScreen} exact />
                <Route path='/order/:id' component={OrderScreen} exact />
                <Route path='/admin/users' component={UserListScreen} exact />
                <Route path='/search/:keyword' component={Home} exact />
                <Route
                  path='/admin/product/:id/edit'
                  component={ProductEditScreen}
                  exact
                />
                <Route
                  path='/admin/products'
                  component={ProductAdminScreen}
                  exact
                />
                <Route
                  path='/admin/user/:id'
                  component={UserEditScreen}
                  exact
                />
                <Route
                  path='/admin/orders'
                  component={OrdersAdminScreen}
                  exact
                />
              </Container>
            </main>
            <Footer />
          </UserState>
        </CartState>
      </ProductState>
    </Router>
  );
}

export default App;
