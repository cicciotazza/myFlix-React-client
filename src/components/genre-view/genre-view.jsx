import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./genre-view.scss";

export function GenreView(props) {
  const { genre } = props
  console.log(genre, 'genre')

  return (
    <>
      <Container className='genre-container'>
        <Row className='genre-row'>
          <Col className='genre-col'>
            <div className="genre-name">
              <span className="label">Name: </span>
              <span className="value">{genre.Name}</span>
            </div>
            <div className="genre-description">
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
            </div>
            <Link to={`/`}>
              <Button className='returnButton' variant='dark'>Return</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}