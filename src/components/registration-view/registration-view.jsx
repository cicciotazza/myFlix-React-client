import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios'

import { Button, Card, CardGroup, Col,  Container, Form, Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import './registration-view.scss';

// { useState } Reat Hook  https://reactjs.org/docs/hooks-state.html
export function RegistrationView(props) {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [Birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName, password, email, Birthday);
    axios.post('https://herokumyflixdb.herokuapp.com/users', {
      //equivalent to the Json format for Postman
      userName: userName,
      password: password,
      email: email,
      Birthday: Birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <div className="registration">
      <Router>
        <Form>
          <h1 className="form-title">Registration</h1>
          <Form.Group controlId="registration-userName">
            <Form.Label>Username:</Form.Label>
            <Form.Control className="userName" value={userName} type="text" placeholder="Create Username" onChange={e => setuserName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="registration-password">
            <Form.Label>Password:</Form.Label>
            <Form.Control className="password" value={password} type="text" placeholder="Create Password" onChange={e => setpassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="registration-email">
            <Form.Label>Email:</Form.Label>
            <Form.Control className="email" value={email} type="email" placeholder="Enter Email" onChange={e => setemail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="registration-Birthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control className="Birthday" value={Birthday} type="date" placeholder="Enter Birthday" onChange={e => setBirthday(e.target.value)}></Form.Control>
          </Form.Group>

          <div className="buttons-registration">
            <Button variant="light" size="lg" className="registerBtn" type="submit" onClick={handleSubmit}>Register </Button>
            <Button onClick={() => { window.location.href = "/" }} variant="danger" size="lg" type="button">Login</Button>
          </div>
        </Form>
      </Router>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};

export default RegistrationView;
