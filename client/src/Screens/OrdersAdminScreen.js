import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

import UserContext from "../contexts/User/UserContext";
import Meta from "../components/Meta";

const OrdersAdminScreen = ({ history }) => {
  const dispatch = useDispatch();
  const usersOrders = useSelector((state) => state.usersOrders);
  const userInfo = useSelector((state) => state.userInfo);

  const { user } = userInfo;

  const { allOrders } = usersOrders;

  useEffect(() => {
    if (user.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push("/login");
    }
  }, [history, user]);
  return (
    <>
      <Meta content='Orders Page' title='Recent Orders' />
      <table class='table my-3'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>DATE</th>
            <th scope='col'>TOTAL</th>
            <th scope='col'>PAID</th>
            <th scope='col'>DELIVERED</th>
            <th scope='col'>NAME</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => (
            <tr>
              <LinkContainer to={`/order/${order._id}`}>
                <th scope='row'>
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </th>
              </LinkContainer>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.paidAt ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  <i className='fas fa-check' style={{ color: "green" }}></i>
                ) : (
                  <i className='fas fa-times' style={{ color: "red" }}></i>
                )}
              </td>
              <td>{order.user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrdersAdminScreen;
