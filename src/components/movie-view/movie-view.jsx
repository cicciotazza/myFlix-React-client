import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { Button, Card, CardGroup, Col,  Container, Form, Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';

import "./movie-view.scss";

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
  }

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    axios.post('https://herokumyflixdb.herokuapp.com/users/${userName}/favoriteMovies/${this.props.movie.Title}', {}, {  
    headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
      .then(response => {
        alert(`Added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="movie-actors">
          <span className="label">Actors: </span>
          <span className="value">{movie.Actors.map(actor => actor.Name).join(", ")}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.array.isRequired,
    Actors: PropTypes.array.isRequired,
    Featured: PropTypes.bool.isRequired,
  }),
};