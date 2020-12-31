import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col, Button, Image, Card } from "react-bootstrap";
import UserContext from "../contexts/User/UserContext";
import Message from "../components/Message";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getOrder,
  payOrderWithPaypal,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";

import StripeCheckout from "react-stripe-checkout";
import { CircleLoading } from "react-loadingg";
import {
  PAY_ORDER_RESET,
  ORDER_DELIVER_RESET,
  PAY_ORDER_PAYPAL_RESET,
} from "../constants/orderConstants";
import Meta from "../components/Meta";

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const payAnOrder = useSelector((state) => state.payAnOrder);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const userInfo2 = useSelector((state) => state.userInfo);
  const payWithPaypal = useSelector((state) => state.payWithPaypal);
  const { successPaypal, loadingPaypal } = payWithPaypal;
  const { delivered, loadingDeliver } = orderDeliver;
  const { user: userDetails } = userInfo2;
  const [sdkReady, setSdkReady] = useState(false);
  // const order1 = useSelector((state) => state.order1);
  const { success } = payAnOrder;
  const { order, user, shippingAddress, orderItems, loading } = orderDetails;
  useEffect(() => {
    const addPayPalScript = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=AXZjkziMbFWlprZi6HpEdBuF_L__AIDDzwzOCtRlC8i4vEpMIr815MH354s-YIp0Ze7FE2qh9N4LbaiF`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order._id ||
      success ||
      successPaypal ||
      delivered ||
      order._id !== match.params.id
    ) {
      dispatch({ type: PAY_ORDER_PAYPAL_RESET });
      dispatch({ type: PAY_ORDER_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrder(match.params.id));
    } else if (order.paymentMethod === "PayPal") {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [dispatch, match, order._id, successPaypal, success, delivered]);

  const handleToken = (token, addresses) => {
    dispatch(payOrder(match.params.id, token));
  };

  const onSuccess = (paymentResult) => {
    dispatch(payOrderWithPaypal(match.params.id, paymentResult));
  };

  const deliverHandler = (e) => {
    dispatch(deliverOrder(match.params.id));
    e.preventDefault();
  };
  return (
    <>
      {loading ? (
        <CircleLoading />
      ) : (
        <>
          <Meta content='Orders Page' title={`Order ${match.params.id}`} />
          <h1>Order ({order._id})</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: {user.name} </strong>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {shippingAddress.address}, {shippingAddress.city}{" "}
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message
                      variant='success'
                      message={`Delivered on ${order.deliveredAt.substring(
                        0,
                        10
                      )}`}
                    />
                  ) : (
                    <Message variant='danger' message='Not Delivered' />
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message
                      variant='success'
                      message={`Paid At ${order.paidAt.substring(0, 10)}`}
                    />
                  ) : (
                    <Message variant='danger' message='Not Paid' />
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>

                  <ListGroup variant='flush'>
                    {orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>{item.name}</Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>
                        ({orderItems.reduce((acc, item) => acc + item.qty, 0)})
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {order.paymentMethod === "Stripe" ? (
                        <StripeCheckout
                          stripeKey='pk_test_51I0lA3D0OfQEoW0jd4RvuU2jgaW8wXW9YJ4irxc4KOkmUbaQlHyCjD5EeJKc5Nst39PS2w8QHyN1xhbS9AQVzNaR0080YjGcqH'
                          token={handleToken}
                          amount={order.totalPrice * 100}
                        />
                      ) : (
                        sdkReady == true && (
                          <PayPalButton
                            onButtonReady={() => setSdkReady(true)}
                            amount={order.totalPrice}
                            onSuccess={onSuccess}
                          ></PayPalButton>
                        )
                      )}
                    </ListGroup.Item>
                  )}
                  {loadingDeliver && <CircleLoading />}
                  {userDetails &&
                    userDetails.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>{" "}
        </>
      )}
    </>
  );
};

export default OrderScreen;
