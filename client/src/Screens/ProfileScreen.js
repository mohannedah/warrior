import React, { useContext, useState, useEffect } from "react";
import { Col, Table, Button, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "../contexts/User/UserContext";
import { updateProfile, getProfile } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import { getOrders } from "../actions/orderActions";
import Meta from "../components/Meta";

const ProfileScreen = ({ history, match }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const profileReducer = useSelector((state) => state.profileReducer);
  const { user } = profileReducer;
  const userInfo = useSelector((state) => state.userInfo);
  const ordersInfo = useSelector((state) => state.ordersInfo);
  const updateReducer = useSelector((state) => state.updateReducer);
  const { success, errors, error } = updateReducer;
  const { orders } = ordersInfo;
  const { loggedIn } = userInfo;

  useEffect(() => {
    if (!loggedIn) {
      history.push("/login");
    } else {
      dispatch(getOrders());
      if (!user.name) {
        dispatch(getProfile("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, user.name, user.email, loggedIn]);

  const onSubmit = (e) => {
    dispatch(updateProfile(email, password, name));
    e.preventDefault();
  };

  return (
    <Row className='my-3'>
      <Meta content='Orders Page' title={`${user.name}'s Profile`} />

      <Col md={3}>
        <form onSubmit={onSubmit}>
          <h3>Update</h3>
          {errors && <Message variant='danger' message={error} />}
          {success && <Message variant='success' message='User Updated' />}
          <div className='form-group'>
            <label>Name</label>
            <input
              type='name'
              className='form-control'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Name'
            />
          </div>

          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              className='form-control'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='Enter email'
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPass(e.target.value)}
              className='form-control'
              placeholder='Enter Password'
            />
          </div>

          {/* <div className='form-group'>
            <label>Confirm Password</label>
            <input
              type='password'
              onChange={(e) => setConf(e.target.value)}
              value={passwordConfirm}
              className='form-control'
              placeholder='Confirm your password'
            />
          </div> */}

          <input type='submit' value='Update' className='btn btn-dark'></input>
        </form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
