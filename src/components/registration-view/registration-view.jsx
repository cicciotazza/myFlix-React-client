import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import './registration-view.scss';

// { useState } Reat Hook  https://reactjs.org/docs/hooks-state.html
export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //Change the state of MainView for registering and logging-ing, sending a request to the server for authenticate
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onRegistration(username);
    };

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Please Register</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} minlength="8" placeholder="Password minimum 8 characters" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                                    </Form.Group>

                                    <Button variant="danger" type="submit" onClick={handleSubmit}>Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

//Information about data when not matching the requested input
RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};