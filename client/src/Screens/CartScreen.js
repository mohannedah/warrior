import React, { useContext, useEffect, Fragment } from "react";
import { addCart, removeItem } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  List,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Meta from "../components/Meta";
import CartContext from "../contexts/Cart/cartContext";

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    dispatch(addCart(match.params.id, Number(location.search.split("=")[1])));
  }, [match, location.search, dispatch]);

  const checkoutBtn = (e) => {
    history.push("/login?redirect=shipping");
    e.preventDefault();
  };

  const removeAnItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <Row>
      <Meta content='Cart' title='Shooping Cart' />

      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Fragment>
            <Message variant='primary' message='Your cart is empty' />{" "}
            <Link className='btn btn-dark' to='/'>
              Go Back
            </Link>
          </Fragment>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item variant='flush'>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid rounded></Image>
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    <span>
                      <strong>${item.price}</strong>
                    </span>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button onClick={(e) => removeAnItem(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='fulsh'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <button className='btn btn-block btn-dark' onClick={checkoutBtn}>
                Proceed to checkout
              </button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
