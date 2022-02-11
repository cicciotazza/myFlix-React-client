import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import PropTypes from "prop-types";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import MainView from './components/main-view/main-view';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

//Find the root of myFlix app
const container = document.getElementsByClassName('app-container')[0];

//Tell React to render myFlix app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);