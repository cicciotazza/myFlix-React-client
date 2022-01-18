import React from 'react';

export class MovieCard extends React.Component {
    render() {
        //this movie is movie={movie}, or x is x={movie}, same in x.title
        const { movie, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    }
}