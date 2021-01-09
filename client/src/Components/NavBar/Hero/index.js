import styled from "styled-components";
import back from "../../../back.jpg";

export const HeroSection = styled.div`
  background-image: url(${back});
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 130rem;
  min-height: 100vh;
`;

export const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeroItems = styled.div`
  padding: 7rem 25rem;
  text-align: center;
`;

export const Typography1 = styled.h1`
  margin: 0 auto;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-transform: lowercase;
`;
