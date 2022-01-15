import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./Card";

const FavoriteList = ({ favoriteMovies, handleRemove }) => {
  const [results, setResults] = useState([]);

  const fetchFavorite = async () => {
    const array = await Promise.all(
      favoriteMovies?.map((id) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=ab30268fbbf1098f2a35b4f32692eb5d`
        )
      )
    );
    setResults(array);
  };

  useEffect(() => {
    fetchFavorite();
  }, [favoriteMovies]);

  console.log(favoriteMovies);

  return (
    <div
      style={{
        backgroundColor: "tan",
      }}
    >
      <h3>Mes favoris</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {results.map((movie) => (
          <MovieCard
            key={movie.data.id}
            title={movie.data.title}
            src={`http://image.tmdb.org/t/p/w500/${movie.data.poster_path}`}
            popularity={movie.data.popularity}
            onClick={() => handleRemove(movie.data.id)}
            addToFavorite="Retirer des favoris"
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteList;
