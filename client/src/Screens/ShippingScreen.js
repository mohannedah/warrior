import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/orderActions";
import UserContext from "../contexts/User/UserContext";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const address1 = useSelector((state) => state.address1);
  const { shippingAddress, entered } = address1;
  const [name, setName] = useState("");
  const [address, setAdd] = useState("");
  const [country, setCount] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostal] = useState("");

  useEffect(() => {
    if (entered) {
      setName(shippingAddress.name);
      setCount(shippingAddress.country);
      setAdd(shippingAddress.address);
      setCity(shippingAddress.city);
      setPostal(shippingAddress.postalCode);
    }
  }, [entered]);
  const onSubmit = (e) => {
    dispatch(saveShippingAddress(name, address, country, city, postalCode));
    history.push("/payment");

    e.preventDefault();
  };

  return (
    <FormContainer>
      <Meta content='Orders Page' title='Enter your Shipping Address' />

      <form onSubmit={onSubmit}>
        <h3 className='my-3'>Shipping Address</h3>
        {/* {error && <Message variant='danger' message={error} />} */}
        <div className='form-group'>
          <label>Full Name</label>
          <input
            type='name'
            value={name}
            className='form-control'
            placeholder='Full Name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Address</label>
          <input
            type='address'
            value={address}
            className='form-control'
            placeholder='Address'
            onChange={(e) => setAdd(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Country</label>
          <input
            type='country'
            value={country}
            className='form-control'
            placeholder='Country'
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>City</label>
          <input
            type='state'
            value={city}
            className='form-control'
            placeholder='City'
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Postal Code</label>
          <input
            type='postalCode'
            value={postalCode}
            className='form-control'
            placeholder='Zip or Postal Code'
            onChange={(e) => setPostal(e.target.value)}
          />
        </div>

        <input type='submit' value='Next' className='btn btn-dark'></input>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
