import React, { Fragment, useEffect, useContext } from "react";
import ProductContext from "../contexts/Product/productContext";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { CircleLoading } from "react-loadingg";
import { GET_ALL_ORDERS_RESET } from "../constants/orderConstants";
import CarouselItem from "../components/Carousel";
import Product from "../components/Product";
import { productActions } from "../actions/productActions";
import Meta from "../components/Meta";
const Home = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;
  useEffect(() => {
    dispatch(productActions(match.params.keyword));
  }, [dispatch, match.params.keyword]);

  return (
    <>
      {!match.params.keyword && <CarouselItem />}
      {!match.params.keyword ? (
        <h1 className='my-3'>Latest Products</h1>
      ) : products.length === 0 ? (
        <h1 className='my-3'>
          Found no Products matching your search '{match.params.keyword}'
        </h1>
      ) : (
        <h1 className='my-3'>
          Found {products.length} Products matching your search '
          {match.params.keyword}'
        </h1>
      )}

      {!loading ? (
        <Fragment>
          <Meta
            content=''
            description='HoodieShop is a shop where you can sell and buy hoodies'
            title='Welcome to HoodieShop'
          />
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} key={product._id} />
              </Col>
            ))}
          </Row>
        </Fragment>
      ) : (
        <CircleLoading />
      )}
    </>
  );
};

export default Home;
