import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Container, Row, Col, Card, CardGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import './registration-view.scss';

// { useState } Reat Hook  https://reactjs.org/docs/hooks-state.html
export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState("");

    //Change the state of MainView for registering and logging-ing, sending a request to the server for authenticate
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onRegistration(username);
    };

    return (
        <form>
            <h1 className="form-title">Registration</h1>
            <Form.Group controlId="registration-Username">
                <Form.Label>Username:</Form.Label>
                <Form.Control className="username" value={username} type="text" placeholder="Create Username" onChange={e => setUsername(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="registration-Password">
                <Form.Label>Password:</Form.Label>
                <Form.Control className="password" value={password} type="text" placeholder="Create Password" onChange={e => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="registration-Name">
                <Form.Label>Name:</Form.Label>
                <Form.Control className="name" value={name} type="text" placeholder="Enter Name" onChange={e => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="registration-Email">
                <Form.Label>Email:</Form.Label>
                <Form.Control className="email" value={email} type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="registration-Birthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control className="birthday" value={birthdate} type="date" placeholder="Enter Birthday" onChange={e => setBirthdate(e.target.value)}></Form.Control>
            </Form.Group>

            <div className="buttons-registration">
                <Button variant="light" size="lg" className="registerBtn" type="submit" onClick={handleSubmit}>Register </Button>
            </div>
        </form>
    );
}

//Information about data when not matching the requested input    
RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthdate: PropTypes.string.isRequired,
    }),
    onRegistration: PropTypes.func.isRequired,
};