import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { CircleLoading } from "react-loadingg";
import {
  Col,
  Row,
  Card,
  ListGroup,
  Image,
  Button,
  Form,
} from "react-bootstrap";
// import products from "../products";
import { getProduct } from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import { REVIEW_PRODUCT_RESET } from "../constants/productConstants";
import { Fragment } from "react";
import { reviewProductAction } from "../actions/productActions";
import Meta from "../components/Meta";

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const indProduct = useSelector((state) => state.indProduct);
  const userInfo = useSelector((state) => state.userInfo);
  const { user } = userInfo;
  const reviewProduct = useSelector((state) => state.reviewProduct);
  const {
    errorProductReview,
    loadingProductReview,
    successProductReview,
  } = reviewProduct;
  const { product, reviews, loading } = indProduct;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [match, successProductReview]);

  const submitHandler = (e) => {
    dispatch(reviewProductAction(product._id, comment, rating));
    e.preventDefault();
  };

  return (
    <>
      {loading ? (
        <CircleLoading />
      ) : (
        <Fragment>
          <Meta content={product.description} title={product.name} />
          <Link to='/' className='btn btn-ligh'>
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color='#FFDF00'
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: <strong>${product.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>{product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Button
                        className='btn-block'
                        disabled={product.countInStock === 0}
                        onClick={addToCart}
                      >
                        Add to Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <span>Qty</span>
                        </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className='my-4'>
              <h2>Reviews</h2>
              {reviews.length === 0 && (
                <Message message='No Reviews on this product' />
              )}
              <ListGroup variant='flush'>
                {reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='#FFDF00' />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message
                      variant='success'
                      message='Review Submitted Successfully'
                    />
                  )}
                  {loadingProductReview && <CircleLoading />}
                  {errorProductReview && (
                    <Message variant='danger' message={errorProductReview} />
                  )}
                  {user.name ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Fragment>
                      Please {""}
                      <Link to='/login'>sign in</Link>
                      {""} to write a review
                    </Fragment>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
      )}
    </>
  );
};

export default ProductScreen;
