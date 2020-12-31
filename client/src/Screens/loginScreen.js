import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserContext from "../contexts/User/UserContext";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { loginUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ match, history, location }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  const { user, error, login, loggedIn } = userInfo;

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  // const { email, password } = state;

  useEffect(() => {
    if (loggedIn) {
      history.push(redirect);
    }
  }, [history, loggedIn, redirect]);

  const onEmail = (e) => {
    setEmail(e.target.value);
  };

  const onPass = (e) => {
    setPass(e.target.value);
  };

  const onSubmit = (e) => {
    dispatch(loginUser(email, password));
    e.preventDefault();
  };

  return (
    <FormContainer>
      <Meta content='Login Page' title='Login' />

      <form onSubmit={onSubmit} className='my-4'>
        <h3>Log in</h3>
        {error && <Message variant='danger' message={error} />}
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            className='form-control'
            placeholder='Enter email'
            onChange={onEmail}
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            className='form-control'
            placeholder='Enter password'
            onChange={onPass}
          />
        </div>

        <input type='submit' value='Sign In' className='btn btn-dark'></input>

        <span className='mx-4'>
          New to ProShop{" "}
          <Link to={`/register?redirect=${redirect}`}>Register</Link>
        </span>
      </form>
    </FormContainer>
  );
};

export default LoginScreen;
