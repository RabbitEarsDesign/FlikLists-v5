import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Movie.module.css";
import Button from "../ui/Button";
// HOOKS
import useHttp from "../../hooks/use-http";
import axios from "axios";

function Movie(props) {
  const [hasImage, setHasImage] = useState(false);
  const [movieAdded, setMovieAdded] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    setHasImage(() => true);
    if (props.data.poster_path === null) {
      setHasImage(() => false);
    }
  }, []);

  let img;

  if (hasImage) {
    img = (
      <img
        src={`https://image.tmdb.org/t/p/w185/${props.data.poster_path}`}
        alt="movie_poster"
        className={classes["movie-img"]}
      />
    );
  } else {
    img = <div className={classes["no-poster"]}>No Image for this movie</div>;
  }

  // const getDetails = async (id) => {
  //   const APIKey = "802f68a97cdcaa8aa345257982de424c";

  //   await axios
  //     .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}`)
  //     .then((res) => {
  //       // props.getMovie(res.data);
  //       appContext.goMovieDetails(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // };

  const setMovie = () => {
    setMovieAdded(true);
  };

  const addToListHandler = () => {
    if (!authContext.isLoggedIn) {
      alert("Login to save movies!");
    } else {
      sendRequest(
        {
          method: "POST",
          url: `https://fliklists-default-rtdb.firebaseio.com/mymovies.json`,
          body: {
            title: props.data.original_title,
            poster: props.data.poster_path,
            release_date: props.data.release_date,
            runtime: props.data.runtime,
            overview: props.data.overview,
          },
        },
        setMovie
      );
    }
  };

  return (
    <li>
      <a>
        {img}
        <p className={classes.movieTitle}>{props.data.title}</p>
      </a>
      <Button
        onClick={addToListHandler}
        classes={classes.btn}
        disabled={movieAdded}
      >
        {isLoading && "Saving..."}
        {!isLoading && !movieAdded && "Add to list"}
        {!isLoading && movieAdded && "Movie saved!"}
      </Button>
    </li>
  );
}

export default Movie;
