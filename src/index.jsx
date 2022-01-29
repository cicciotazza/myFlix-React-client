//Branch 3.4
import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import PropTypes from "prop-types";
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import './index.scss';

//my main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Container>
                <MainView />
            </Container>
        );
    }
}

//Find the root of myFlix app
const container = document.getElementsByClassName('app-container')[0];

//React renders myFlix app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);