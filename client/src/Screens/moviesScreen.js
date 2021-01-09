import React from "react";
import requests from "../requests";
import Row from "../Components/Row";
import Banner from "../Components/Banner";
const moviesScreen = () => {
  return (
    <>
      <Banner />
      <Row title='Action Movies' isLargeRow fetchURL={requests.fetchAction} />
      <Row title='Comedy' fetchURL={requests.fetchComedy} />
      <Row title='Drama' fetchURL={requests.fetchDrama} />
      <Row title='Upcoming' fetchURL={requests.fetchUpcoming} />
      <Row title='Adventure' fetchURL={requests.fetchAdventure} />
      <Row title='Top Rated' fetchURL={requests.fetchTopRated} />
    </>
  );
};

export default moviesScreen;
