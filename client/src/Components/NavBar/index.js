import styled from "styled-components";
export const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
`;

export const NavBarLogo = styled.img`
  height: 6rem;
  margin: 1rem 3rem;
`;

export const NavBarButton = styled.button`
  padding: 0.5rem 1rem;
  font-weight: 400;
  border-radius: 0.2rem;
  background-color: #e50914;
  color: #fff;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 1rem 3rem;
`;

export const FeaturesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  max-width: 100%;
  padding: 4rem 8rem;
  border-bottom: 5px solid #757575;

  @media only screen and (max-width: 61.875em) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem 6rem;
  }
`;

export const Item1 = styled.div`
  flex: 0 0 60%;
  text-align: center;
  @media only screen and (max-width: 61.875em) {
    order: -1;
  }
`;

export const Item2 = styled.div`
  flex: 1;
`;
