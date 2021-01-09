import React from "react";
import styled from "styled-components";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../Actions/userActions";
const NavBarContainer = styled.nav`
  height: 7rem;
  display: flex;
  padding: 5rem 3rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #e6e6e6;
  background-color: #fff;
`;

const LogoContainer = styled.img`
  display: flex;
  aling-items: center;
  justify-content: center;
  height: 12rem;
  cursor: pointer;
`;

const SignInOrOut = styled(Link)`
  font-size: 1.9rem;
  font-weight: 700;
  color: #333;
  transition: all 0.1s ease-in-out;

  &:hover {
    color: #e50914;
  }
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const { loggedIn } = userInfo;

  const history = useHistory();

  const onSignOut = (e) => {
    dispatch(logOut());
    e.preventDefault();
  };

  const onClick = (e) => {
    history.push("/");
    e.preventDefault();
  };
  return (
    <NavBarContainer>
      <LogoContainer onClick={onClick} src={Logo} />
      {loggedIn ? (
        <SignInOrOut onClick={onSignOut}>Sign Out</SignInOrOut>
      ) : (
        <SignInOrOut to='/signin'>Sign In</SignInOrOut>
      )}
    </NavBarContainer>
  );
};

export default NavBar;
