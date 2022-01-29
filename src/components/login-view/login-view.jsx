//import React, initial value of my login variable (empty)
//useState creates a local state and preserves it between the render cycles
import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './login-view.scss';

// array of paired values destructured
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios.post('https://herokumyflixdb.herokuapp.com/login', {
      Username: username,
      Password: password
      //Username: userName,
      //Password: password
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
              <Form.Group controlId="form-Username">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
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
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
