import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  return (
    <>
      <SavedList list={savedList} />
  <Route exact path="/" render={props => {return <MovieList {...props} sendMovies={setMovies}/>}} />
      <Route path="/update-movie/:id" render={props => { return <UpdateMovie {...props} movies={movies}/>}} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  );
};

export default App;
