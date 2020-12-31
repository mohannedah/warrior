import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'> {product.name} </Card.Title>
        </Link>

        <Card.Title as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color='#FFDF00'
          />
        </Card.Title>

        <Card.Title as='h3' className='my-2'>
          ${product.price}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Product;
