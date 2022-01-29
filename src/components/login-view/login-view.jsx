//import React with initial value of my login variable (empty)
//useState creates a local state and preserves it between the render cycles
import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import './login-view.scss';

// array of paired values destructured
export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //props.onLoggedIn allows to be automatically logged in—regardless of whether or not correct credentials
    // if refreshed, users will neet do login again
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };
    //send a request to the server for authentication
    //call props.onLoggedIn(username)

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}

LoginView.propTypes = {
    login: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};