import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
  }

  addFavoriteMovies() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    axios.post
    {/*             Postman --> app.post("/users/:userName/favoriteMovies/:MovieID", */ }
    (`https://herokumyflixdb.herokuapp.com/users/${userName}/favoriteMovies/${movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
      .then(response => {
        alert(`Added to your list of Favorites`)
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
          <Link to={`/genres/${movie.Genre.Name}`} className="value">{movie.Genre.Name}</Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/directors/${movie.Director.Name}`} className="value">{movie.Director.Name}</Link>
        </div>
        <div>
          <br></br>
          <Button onClick={() => { onBackClick(null); }} variant="secondary" size="lg">Return to home page</Button>
          <br></br>
          <Button variant="outline-warning" size='lg' className="btn-outline-warning" value={movie._id} onClick={(e) => this.addFavoriteMovies(e, movie)}>Add to list of Favorites</Button>
        </div>
      </div>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.array.isRequired,
    Actors: PropTypes.array.isRequired,
    ImgPath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }),
};