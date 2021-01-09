import dotenv from "dotenv";
dotenv.config();

const API_KEY = "a05afb3693908f6550d5a2b62dd6484b";

const requests = {
  fetchAction: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&append_to_response=videos&with_genres=28
  `,
  fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&append_to_response=videos&language=en-US&page=1`,
  fetchUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  fetchAdventure: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&append_to_response=videos&with_genres=12`,
  fetchComedy: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&append_to_response=videos&with_genres=35`,
  fetchDrama: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&append_to_response=videos&with_genres=18`,
  fetchDocumentary: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&append_to_response=videos&with_genres=99`,
};

export default requests;
