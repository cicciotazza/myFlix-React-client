import React from 'react'

import { Button, Card, CardGroup, Col,  Container, Form, Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navbar-view.scss'

export class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  render() {
    const { user } = this.props
    const movies = `/`;
    const profile = `/user/id/${user}`;

    return (
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light" expand="lg" fixed="top">
        <Container className="navbar-menu">
          <Navbar.Brand href="/"><b>MyFlix REACT</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Genres" id="collasible-nav-dropdown">
                <NavDropdown.Item href="genres/Crime">Crime</NavDropdown.Item>
                <NavDropdown.Item href="genres/Fantasy">Fantasy</NavDropdown.Item>
                <NavDropdown.Item href="genres/Sitcom">Sitcom</NavDropdown.Item>
                <NavDropdown.Item href="genres/Crime">Crime</NavDropdown.Item>
                <NavDropdown.Item href="genres/History">History</NavDropdown.Item>
                <NavDropdown.Item href="genres/Espionage">Espionage</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link id="Account" href={profile}>My Profile</Nav.Link>
              <Nav.Link id="logout" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}