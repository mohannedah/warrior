import React from "react";
import logo from "../../images/logo.png";
import { NavBarContainer, NavBarLogo, NavBarButton } from "./index";
const Header = () => {
  return (
    <NavBarContainer>
      <NavBarLogo src={logo} />
      <NavBarButton>Sign In</NavBarButton>
    </NavBarContainer>
  );
};
export default Header;
