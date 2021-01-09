import React, { useState, useEffect } from "react";
import { subscripeAction } from "../Actions/userActions";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CardInput from "../Components/CardInput";
import Navbar from "../Components/NavBar";

const FlexContainer = styled.div`
  min-height: 50vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.body`
  height: 100vh;
  background-color: #fff;
`;

const useStyles = makeStyles({
  root: {
    width: "50rem;",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    marginTop: "2rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    fontSize: "2rem",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
  typograpyh: {
    fontSize: "4rem",
  },
});

function PaymentScreen() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const { user } = userInfo;
  const subscripe = useSelector((state) => state.subscripe);
  const history = useHistory();
  const { subscriptionResult } = subscripe;
  useEffect(() => {
    if (stripe && elements) {
      setSdkReady(true);
    }
  }, [stripe, user, elements, setSdkReady]);

  const handleSubmitSub = async (e) => {
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    const payment_method = result.paymentMethod;
    dispatch(subscripeAction(email, payment_method));

    const status = subscriptionResult.status;
    const client_secret = subscriptionResult.client_secret;
    if (status === "requires_action") {
      stripe.confirmCardPayment(client_secret).then(function (result) {
        if (result.error) {
          console.log("There was an issue!");
          console.log(result.error);
        } else {
          console.log("You got the money!");
        }
      });
    } else {
      history.push("/movies");
      console.log("You are subscribed!");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <FlexContainer>
          <h1 style={{ color: "#333", fontSize: "4rem", fontWeight: "500" }}>
            You are about to subscribe to the premium plan
          </h1>

          <Card fullWidth className={classes.root}>
            <CardContent className={classes.content}>
              <input
                type='email'
                className='px-3 py-5 mb-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full'
                placeholder='Email'
                label='Email'
                style={{
                  fontSize: "1.5rem",
                  transition: "all .15s ease",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {sdkReady && <CardInput />}

              <div className={classes.div}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  style={{ fontSize: "1.2rem" }}
                  onClick={handleSubmitSub}
                >
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </FlexContainer>
      </Container>
    </>
  );
}

export default PaymentScreen;
