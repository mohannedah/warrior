import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import requests from "../requests";

const BannerContainer = styled.header`
  box-shadow: inset 1px -68px 64px 62px rgba(0, 0, 0, 0.75);
  min-height: 80vh;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
  max-width: 100%;
  display: flex;
  align-items: center;
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 3rem;
`;

const MovieName = styled.h1`
  font-weight: 700;
  padding: 0.5rem 0rem;
`;

const BannerButtonContainer = styled.div`
  display: flex;
`;

const BannerButton = styled.button`
  padding: 0.5rem 3rem;
  background-color: rgba(51, 51, 51, 0.5);
  border: none;
  outline: none;
  margin-right: 1rem;
  text-align: center;
  color: white;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e6e6e6;
    color: #000;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-top: 1rem;
  max-width: 40%;
  font-weight: 700;
`;

const base = "https://image.tmdb.org/t/p/original/";

const Banner = () => {
  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const [movie, setMovie] = useState({});

  useEffect(async () => {
    const { data } = await axios.get(requests.fetchUpcoming);
    const num = Math.floor(getRandomArbitrary(0, 19));
    setMovie(data.results[num]);
  }, [axios, setMovie]);
  const image = `${base}${movie.backdrop_path}`;
  return (
    <BannerContainer image={image}>
      <BannerContent>
        <MovieName>{movie.title}</MovieName>
        <BannerButtonContainer>
          <BannerButton>Play</BannerButton>
          <BannerButton>My List</BannerButton>
        </BannerButtonContainer>
        <Description>{movie.overview}</Description>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
