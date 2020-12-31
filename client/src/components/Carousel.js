import React, { Fragment, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { topProductsAction } from "../actions/productActions";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { CircleLoading } from "react-loadingg";

const CarouselComponent = () => {
  const dispatch = useDispatch();
  const topProducts = useSelector((state) => state.topProducts);
  const { products, loadingProducts } = topProducts;
  useEffect(() => {
    dispatch(topProductsAction());
  }, [dispatch]);
  return (
    <>
      {loadingProducts ? (
        <CircleLoading />
      ) : (
        <Carousel pause='hover' className='bg-dark my-4'>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default CarouselComponent;
