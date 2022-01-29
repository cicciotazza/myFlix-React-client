import React from 'react';
import PropTypes from "prop-types";

import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} crossorigin="anonymous" />
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
        ImgPath: PropTypes.string.isRequired,
        Genre: PropTypes.array.isRequired,
        Director: PropTypes.array.isRequired,
        Actors: PropTypes.array.isRequired,
        Featured: PropTypes.bool.isRequired,
    }),
};

/*
//my view of the db according to my Model of the final 2.10
MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birthday: PropTypes.string.isRequired,
            Death: PropTypes.string.isRequired,
        }).isRequired,
        ImageURL: PropTypes.string.isRequired,
    }).isRequired,
};
*/


