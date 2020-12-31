import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import { getProduct, updateProductAction } from "../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductEditScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const indProduct = useSelector((state) => state.indProduct);
  const updateProduct = useSelector((state) => state.updateProduct);
  const { updated } = updateProduct;
  const { product } = indProduct;
  const { user } = userInfo;
  const [inStock, setInStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCat] = useState("");

  useEffect(() => {
    if (!user && !user.isAdmin) {
      history.push("/login");
    } else {
      if (!product._id || updated || product._id !== match.params.id) {
        dispatch({ type: UPDATE_PRODUCT_RESET });
        dispatch(getProduct(match.params.id));
      } else {
        setName(product.name);
        setBrand(product.brand);
        setImage(product.image);
        setDesc(product.description);
        setCat(product.category);
        setPrice(product.price);
        setInStock(product.countInStock);
      }
    }
  }, [dispatch, product._id, user, updated, match, history]);

  const onSubmit = (e) => {
    dispatch(
      updateProductAction(match.params.id, {
        name,
        brand,
        image,
        description,
        category,
        price,
        countInStock: inStock,
      })
    );
    e.preventDefault();
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploadImage", formData, config);
      setImage(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='d-flex justify-content-between align-items-center'>
      <FormContainer>
        <Meta content='Orders Page' title={`Edit Product ${product.name}`} />

        <form onSubmit={onSubmit} className='my-2'>
          <h3>Edit Product</h3>
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
            <label>Brand</label>
            <input
              type='brand'
              className='form-control'
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              placeholder='Brand'
            />
          </div>

          <div className='form-group'>
            <label>Category</label>
            <input
              type='category'
              value={category}
              onChange={(e) => setCat(e.target.value)}
              className='form-control'
              placeholder='Category'
            />
          </div>

          <div className='form-group'>
            <label>Image</label>
            <input
              type=''
              onChange={(e) => setImage(e.target.value)}
              value={image}
              className='form-control'
              placeholder='Image'
            />
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
          </div>

          <div className='form-group'>
            <label>Description</label>
            <input
              type='description'
              onChange={(e) => setDesc(e.target.value)}
              value={description}
              className='form-control'
              placeholder='Description'
            />
          </div>

          <div className='form-group'>
            <label>Price</label>
            <input
              type='price'
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className='form-control'
              placeholder='Price'
            />
          </div>
          <div className='form-group'>
            <label>Count In Stock</label>
            <input
              type='inStock'
              onChange={(e) => setInStock(e.target.value)}
              value={inStock}
              className='form-control'
              placeholder='Quantity in stock'
            />
          </div>

          <input type='submit' value='Edit' className='btn btn-dark'></input>
        </form>
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
