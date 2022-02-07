//import React, initial value of my login variable (empty)
//useState creates a local state and preserves it between the render cycles
import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import { Button, Card, CardGroup, Col, Container, Form, Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './login-view.scss';

// array of paired values destructured
export function LoginView(props) {
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName, password);
    /* Send a request to the server for authentication */
    axios.post('https://herokumyflixdb.herokuapp.com/login', {
      userName: userName,
      password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('User not found')
      });
  };
  //send a request to the server for authentication
  //call props.onLoggedIn(username)

  return (
    <Router>
      <Container>
        <Row>
          <Col>
            <Form>
              <h1 className="form-title">Login</h1>
              <Form.Group controlId="form-userName">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="userName" placeholder="Enter Username" onChange={e => setuserName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="form-password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={e => setpassword(e.target.value)} />
              </Form.Group>
              <div className="buttons-login">
                <Button onClick={() => { window.location.href = "/register" }} variant="light" size='lg' type="button">Register</Button>
                <Button variant="danger" type="submit" size='lg' onClick={handleSubmit}>Submit</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

LoginView.propTypes = {
  login: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};