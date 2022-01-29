import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import PropTypes from "prop-types";
import axios from 'axios';
import Container from 'react-bootstrap/Container';

import './index.scss';

// Main component
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

//Tell React to render myFlix app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);