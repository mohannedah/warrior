import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { setPayment } from "../actions/orderActions";
import UserContext from "../contexts/User/UserContext";
import axios from "axios";
import Meta from "../components/Meta";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const payment1 = useSelector((state) => state.payment1);
  const { paymentMethod } = payment1;
  const [payment, setPaymentMethod] = useState("PayBal");

  const onSubmit = (e) => {
    dispatch(setPayment(payment));
    history.push("/placeOrder");
    e.preventDefault();
  };
  return (
    <FormContainer>
      <Meta content='Orders Page' title='Choose your Payment Method' />

      <h1>Payment Method</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
