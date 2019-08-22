import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";


export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        this.setState({ movies: res.data });
        this.props.sendMovies(this.state.movies);
      })
      .catch(err => console.log(err.response));
  }
  updateMovies = (e, newData) => {
    e.preventDefault();
    this.setState({movies: newData})
    this.props.sendMovies(this.state.movies);
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies && this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} updateMovies={this.updateMovies}/>
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie, updateMovies }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} updateMovies={updateMovies}/>
    </Link>
  );
}
