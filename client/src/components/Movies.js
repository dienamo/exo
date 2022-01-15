import MovieCard from "./Card";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Movies({ favoriteMovies, movies, handleFavorite }) {
  return (
    <div>
      <h3>Movies list</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            popularity={movie.popularity}
            onClick={() => handleFavorite(movie.id, movie.title)}
            disabled={favoriteMovies?.includes(movie.id) ? true : false}
            addToFavorite={
              favoriteMovies?.includes(movie.id) ? (
                <FavoriteIcon />
              ) : (
                "Ajouter aux favoris"
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Movies;
