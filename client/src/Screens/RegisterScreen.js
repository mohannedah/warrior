import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/userActions";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.registerUser);
  const { user, loggedIn, errors, error, loading } = registerUser;
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [passwordConfirm, setConf] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    dispatch(registerUser(email, password, name, passwordConfirm));
    e.preventDefault();
  };

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [history, loggedIn, error]);
  return (
    <FormContainer>
      <Meta content='Register Page' title='Register an account' />

      <form onSubmit={onSubmit} className='my-2'>
        <h3>Register</h3>
        {errors && <Message variant='danger' message={error} />}
        <div className='form-group'>
          <label>Name</label>
          <input
            type='name'
            className='form-control'
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder='First name'
          />
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Enter email'
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className='form-control'
            placeholder='Enter password'
          />
        </div>

        <div className='form-group'>
          <label>Confirm Password</label>
          <input
            type='password'
            onChange={(e) => setConf(e.target.value)}
            value={passwordConfirm}
            className='form-control'
            placeholder='Confirm your password'
          />
        </div>

        <input type='submit' value='Register' className='btn btn-dark'></input>
        <p className='forgot-password text-right'>
          Already registered <Link to='/login'>log in?</Link>
        </p>
      </form>
    </FormContainer>
  );
};

export default RegisterScreen;
