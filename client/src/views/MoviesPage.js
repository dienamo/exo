import Movies from "../components/Movies";
import React, { useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import FavoriteList from "../components/FavoriteList";
import TextField from "@mui/material/TextField";

import axios from "axios";

const MoviesPage = () => {
  const user = React.useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios
      .post(
        "https://api.themoviedb.org/3/movie/popular?language=id&api_key=e6b38212baf459bc1749d1e0fa386e4c"
      )
      .then((movies) => {
        setMovies(movies.data.results);
        setFilteredMovies(movies.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => setFavoriteMovies(user.favoriteMovies), [user]);

  const handleFavorite = (movieId, movieTitle) => {
    const userId = user._id;
    const userName = user.username;
    axios
      .put(
        "http://localhost:8000/api/addtofavorite",
        { movieId, movieTitle, userId, userName },
        { withCredentials: true }
      )
      .then((movieId) => {
        const newFavoriteMovie = movies.find(
          (movie) => movie.id === movieId.data
        );
        setFavoriteMovies([...favoriteMovies, newFavoriteMovie.id]);
      })
      .catch((err) => console.log(err));
  };

  const userId = user._id;
  const handleRemove = (movieId) => {
    axios
      .put(
        "http://localhost:8000/api/removefromfavorite",
        { movieId, userId },
        { withCredentials: true }
      )
      .then((movieId) => {
        const movieToRemove = movies.find((movie) => movie.id === movieId.data);
        setFavoriteMovies(
          favoriteMovies.filter((movie) => movie !== movieToRemove.id)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (text) => {
    setSearch(text);
  };

  useEffect(() => {
    if (search) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=ab30268fbbf1098f2a35b4f32692eb5d&query=${search}`
        )
        .then((movies) => {
          setFilteredMovies(movies.data.results);
          setSuggestions(movies.data.results);
        })
        .catch((err) => console.log(err));
    } else {
      setFilteredMovies(movies);
      setSuggestions("");
    }
  }, [search, movies]);

  const handleSelect = (title) => {
    console.log(title);
    setSearch(title);
    setSuggestions([]);
  };

  return (
    <div>
      <TextField
        style={{ width: "50vw", marginTop: "50px" }}
        id="outlined-basic"
        label="Search..."
        size="medium"
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        value={search}
      />
      {suggestions &&
        suggestions.map((movie) => (
          <div key={movie.id} onClick={() => handleSelect(movie.title)}>
            {movie.title}
          </div>
        ))}
      <div style={{ display: "flex" }}>
        <Movies
          movies={filteredMovies}
          favoriteMovies={favoriteMovies}
          handleFavorite={handleFavorite}
        />
        {user && (
          <FavoriteList
            favoriteMovies={favoriteMovies}
            handleRemove={handleRemove}
          />
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
