import React from 'react'

import { Button, Card, CardGroup, Col, Container, Form, Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
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
    const { userName } = this.props
    const movies = `/`;
    const profile = `/user/${userName}`;

    return (

      <Navbar bg="light" expand="lg">
        <Container className="navbar-menu">
          <Navbar.Brand href="/"><b>MyFlix REACT</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Movies</Nav.Link>
              {/*     <Nav.Link href="#link">Actors</Nav.Link>
                <Nav.Link href="#link">Directors</Nav.Link>   */}
              <NavDropdown title="Directors" id="collasible-nav-dropdown">
                <NavDropdown.Item href="directors/Alan%20Ball">Alan Ball</NavDropdown.Item>
                <NavDropdown.Item href="directors/George%20Raymond%20Martin">George Raymond Martin</NavDropdown.Item>
                <NavDropdown.Item href="directors/Ricky%20Gervais">Ricky Gervais</NavDropdown.Item>
                <NavDropdown.Item href="directors/Craig%20Mazin">Craig Mazin</NavDropdown.Item>
                <NavDropdown.Item href="directors/Charlie%20Brooker">Charlie Brooker</NavDropdown.Item>
                <NavDropdown.Item href="directors/Jeffrey%20Jacob%20Abrams">Jeffrey Jacob Abrams</NavDropdown.Item>
                <NavDropdown.Item href="directors/Shelagh%20Stephenson">Shelagh Stephenson</NavDropdown.Item>
                <NavDropdown.Item href="directors/Gideon%20Raff">Gideon Raff</NavDropdown.Item>
                <NavDropdown.Item href="directors/Mark%20Cendrowski">Mark Cendrowski</NavDropdown.Item>
              </NavDropdown>
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