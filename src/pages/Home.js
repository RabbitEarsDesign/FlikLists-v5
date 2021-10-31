import React, { useState, useEffect } from "react";
import axios from "axios";
// COMPONENTS
import SearchedMovies from "../components/Movies/SearchedMovies";
import SearchForm from "../components/ui/SearchForm";
import Logo from "../components/ui/Logo";

function Home() {
  const [movieQuery, setMovieQuery] = useState("");
  const [movies, setMovies] = useState([]);

  // I should figure out how to create a custom hook for this
  useEffect(() => {
    // setIsloading(true);

    // setTimeout so that we don't send too many http requests
    const searcher = setTimeout(async () => {
      console.log("useEffect Running");
      const APIKey = "802f68a97cdcaa8aa345257982de424c";

      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${movieQuery}`
        )
        .then((res) => {
          setMovies(res.data.results);
        })
        .catch((err) => console.error(err));
    }, 500);

    // setIsloading(false);

    // The return statement ensures there are not a bunch of timers running at once
    return () => {
      console.log("useEffect Cleanup");
      clearTimeout(searcher);
    };
  }, [movieQuery]);

  const movieQueryHandler = (e) => {
    setMovieQuery(e.target.value);
  };

  const showMovies = movies.length !== 0;

  return (
    <section className="container">
      <SearchForm onChange={movieQueryHandler} />
      {!showMovies && <Logo />}
      {showMovies && <SearchedMovies movies={movies} />}
    </section>
  );
}

export default Home;
