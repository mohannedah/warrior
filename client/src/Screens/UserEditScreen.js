import React, { useState, useContext, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { Form } from "react-bootstrap";
import UserContext from "../contexts/User/UserContext";

const UserEditScreen = ({ match, history }) => {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { updateUser, getUserandUpdate, user, error } = userContext;

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/login");
    }
    getUserandUpdate(match.params.id);
    // setName(updateUser.name);
    // setEmail(updateUser.email);
    // setIsAdmin(updateUser.isAdmin);

    // eslint-disable-next-line
  }, [match, history, user]);

  const onEmail = (e) => {
    setEmail(e.target.value);
  };

  const onName = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    getUserandUpdate(match.params.id, email, name, isAdmin);
    e.preventDefault();
  };

  return (
    <FormContainer>
      <form onSubmit={onSubmit} className='my-4'>
        <h3>Update</h3>
        {error && <Message variant='danger' message={error} />}
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            className='form-control'
            placeholder='Enter new email'
            onChange={onEmail}
          />
        </div>

        <div className='form-group'>
          <label>Name</label>
          <input
            type='name'
            value={name}
            className='form-control'
            placeholder='Enter new name'
            onChange={onName}
          />
        </div>

        <Form.Check
          type='radio'
          label='Is Admin'
          name='paymentMethod'
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        ></Form.Check>

        <input type='submit' value='Update' className='btn btn-dark'></input>
      </form>
    </FormContainer>
  );
};

export default UserEditScreen;
