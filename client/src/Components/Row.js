import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
const base = "https://image.tmdb.org/t/p/original/";

const PosterContainer = styled.div`
  padding: 0rem 3rem;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Typography = styled.h3`
  font-weight: 700;
  margin-left: 3rem;
`;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#E50914");

  useEffect(async () => {
    const { data } = await axios.get(fetchURL);
    setMovies(data.results);
    if (movies !== []) {
      setLoading(false);
    }
  }, [axios, setLoading, setMovies]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <>
      <Typography>{title}</Typography>
      <PosterContainer>
        {movies.map((movie) => (
          <img
            className={`row_poster ${isLargeRow && "row_poster_Large"}`}
            src={`${base}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt=''
          />
        ))}
      </PosterContainer>
    </>
  );
};

export default Row;
