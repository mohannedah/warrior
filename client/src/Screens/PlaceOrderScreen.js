import React, { useEffect } from "react";
import { PLACE_ORDER_RESET } from "../constants/orderConstants";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, getOrder } from "../actions/orderActions";
import { ListGroup, Col, Row, Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const order1 = useSelector((state) => state.order1);
  const payment1 = useSelector((state) => state.payment1);
  const address1 = useSelector((state) => state.address1);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { paymentMethod } = payment1;
  const { shippingAddress } = address1;
  const { order, shippingPrice, taxPrice, placed } = order1;
  // const {
  //   shippingAddress,
  //   paymentMethod,
  //   loggedIn,
  //   entered,
  //   placeOrder,
  //   taxPrice,
  //   shippingPrice,
  //   placed,
  //   order,
  //   getOrder,
  // } = userContext;

  useEffect(() => {
    if (placed) {
      history.push(`/order/${order.id}`);
      dispatch({ type: PLACE_ORDER_RESET });
    }
    // eslint-disable-next-line
  }, [history, dispatch, placed]);

  const onClick = (e) => {
    dispatch(
      placeOrder({
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice: cartItems
          .reduce((acc, item) => acc + item.qty * item.price, 0)
          .toFixed(2),
        orderItems: cartItems,
      })
    );

    // history.push(`/order/${order.id}`);

    e.preventDefault();
  };
  //   const paymentMethod = null;
  //   const { cartItems } = cartContext;
  return (
    <>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <Row>
        <Meta content='Orders Page' title='Place your Order' />

        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <h1>Your cart is empty</h1>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
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
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
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
                    ({cartItems.reduce((acc, item) => item.qty + acc, 0)})
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* {error && <Message variant='danger'>{error}</Message>} */}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={onClick}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
