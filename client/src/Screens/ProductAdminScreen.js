import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { deleteProductAction } from "../actions/productActions";
import {
  productActions,
  createProductAction,
  productAdminActions,
} from "../actions/productActions";
import { CREATE_PRODUCT_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductAdminScreen = ({ history }) => {
  const dispatch = useDispatch();
  const productListAdmin = useSelector((state) => state.productListAdmin);
  const userInfo = useSelector((state) => state.userInfo);
  const createProduct = useSelector((state) => state.createProduct);
  const { created, createdProduct, id } = createProduct;
  const deleteProduct = useSelector((state) => state.deleteProduct);
  const { deleted, loading: deleteLoading } = deleteProduct;
  const { user } = userInfo;
  const { allProducts: products } = productListAdmin;

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/login");
    } else {
      dispatch(productAdminActions());
    }
    if (created) {
      history.push(`/admin/product/${id}/edit`);
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
    // eslint-disable-next-line
  }, [dispatch, history, user, created, deleted]);

  const deleteHandler = (id) => {
    dispatch(deleteProductAction(id));
  };

  const onClick = (e) => {
    dispatch(createProductAction());
    e.preventDefault();
  };
  return (
    <>
      <Meta content='Orders Page' title='All Products' />

      <div className='d-flex my-4 align-items-center justify-content-between'>
        <h1>PRODUCTS</h1>
        <Button onClick={onClick} className='btn btn-dark'>
          <i class='fas fa-plus mx-1'></i> Create Product
        </Button>
      </div>
      <table class='table'>
        <thead class='thead'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>NAME</th>
            <th scope='col'>STOCK</th>
            <th scope='col'>PRICE</th>
            <th scope='col'>BRAND</th>
            <th scope='col'>EDIT/DELETE</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <LinkContainer to={`/product/${product.id}`}>
                <th scope='row'>
                  <Link to={`/product/${product._id}`}>{product._id}</Link>
                </th>
              </LinkContainer>
              <td>{product.name}</td>
              {product.countInStock === 0 ? (
                <td>
                  <i className='fas fa-times' style={{ color: "red" }}></i>
                </td>
              ) : (
                <td>{product.countInStock}</td>
              )}
              <td>${product.price}</td>
              <td>{product.brand}</td>
              <td>
                {" "}
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(product._id)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductAdminScreen;
