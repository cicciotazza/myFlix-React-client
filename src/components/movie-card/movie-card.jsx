import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, CardGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <Card>
                <Card.Img className="card-img" variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Button onClick={() => onMovieClick(movie)} variant="outline-primary">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

/*
MovieCard.propTypes = {
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
    onMovieClick: PropTypes.func.isRequired
}; 
*/