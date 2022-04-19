import React from 'react';
import { Button, Card, CardGroup, Col, Container, Form, Navbar, Nav, NavDropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./director-view.scss";

export function DirectorView(props) {
  const { Director } = props;
  console.log(Director, 'director');
  return (

    <Container fluid>
      <Row className="director-view">
        <Col>
          <div>
            <div className="director-name">
              <span className="label">Name: </span>
              <span className="value">{Director.Name}</span>
            </div>
            <div className="director-bio">
              <span className="label">Biography: </span>
              <span className="value">{Director.Bio}</span>
            </div>
            <div className="director-birthday">
              <span className="label">Year of Birth: </span>
              <span className="value">{Director.Birthday}</span>
            </div>
            <div className="director-death">
              <span className="label">Year of Death: </span>
              <span className="value">{Director.Death}</span>
            </div>
            <Link to={`/`}>
              <Button className='returnButton' variant='dark'>Return to home page</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
