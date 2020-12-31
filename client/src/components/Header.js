import React, { useContext, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/userActions";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchPage from "./SearchBar";
import { Fragment } from "react";

const Header = ({ history, location }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const { user, loggedIn } = userInfo;
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  // useEffect(() => {
  //   if (!loggedIn) {
  //     history.push(redirect);
  //   }
  // }, [loggedIn, history, location]);

  const onClick = (e) => {
    dispatch(logOut());
    history.push("/");
    e.preventDefault();
  };

  return (
    <header>
      <Navbar bg='dark' expand='lg' variant='dark' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>HoodieShop</Navbar.Brand>
          </LinkContainer>

          <Route render={({ history }) => <SearchPage history={history} />} />

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart' /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                {!loggedIn ? (
                  <Nav.Link>
                    <i className='fas fa-user' /> Sign In
                  </Nav.Link>
                ) : (
                  <Fragment>
                    <NavDropdown title={`Hello ${user.name}`} id='username'>
                      <LinkContainer to={`/profile`}>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/' onClick={onClick}>
                        <NavDropdown.Item>LogOut</NavDropdown.Item>
                      </LinkContainer>
                      {user.isAdmin && (
                        <>
                          <LinkContainer to='/admin/users'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/orders'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/products'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                        </>
                      )}
                    </NavDropdown>
                  </Fragment>
                )}
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
