import React from "react";
// COMPONENTS
import Movie from "./Movie";

// CLASSES
import classes from "./SearchedMovies.module.css";
function SearchedMovies(props) {
  return (
    <ul className={classes["searched-movies"]}>
      {props.movies.map((movie) => {
        return (
          <Movie
            data={movie}
            key={movie.id}
            id={movie.id}
            // getMovie={getMovieHandler}
          ></Movie>
        );
      })}
    </ul>
  );
}

export default SearchedMovies;
