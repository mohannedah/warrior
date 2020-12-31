import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/User/UserContext";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { CircleLoading } from "react-loadingg";
import Message from "../components/Message";

const UserListScreen = ({ history }) => {
  const userContext = useContext(UserContext);

  const {
    users,
    user,
    getAllUsers,
    error,
    loading,
    deleteUser,
    evaluating,
  } = userContext;

  useEffect(() => {
    if (user.isAdmin || evaluating) {
      getAllUsers();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [user, history, evaluating]);
  const deleteHandler = (id) => {
    deleteUser(id);
  };
  return (
    <div className='my-4'>
      <h1>Users</h1>
      {loading ? (
        <CircleLoading />
      ) : error ? (
        <Message variant='danger' message={`${error}`} />
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
