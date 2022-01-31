import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Button, Card, CardGroup, Col,  Container, Form, Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Container className='movieContainer'>
        <Row>
          <Col>
            <Card key={movie}>  
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text className='Card-Text' >{movie.Description}</Card.Text>
                <Link to={`/movies/${movie.Title}`}>
                <Button className="Info-Card" onClick={() => onMovieClick(movie)} variant="link">Info</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
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