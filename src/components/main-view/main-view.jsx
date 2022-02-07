//axios needed to fetch movies from db
import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

import { Button, Card, CardGroup, Col, Container, Form, Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './main-view.scss';

//LoginView at the top of the code because it will need to get the user details from the MainView
//importing Login, Registration, MovieCard and movieview into MainView
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from '../director-view/director-view';
import { Navbar } from '../navbar-view/navbar-view';
import { Userview } from '../user-view/user-view';

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    }

    this.getUser = this.getUser.bind(this)
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.userName
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.userName);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://herokumyflixdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {   //Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser() {
    const userName = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://herokumyflixdb.herokuapp.com/users/${userName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          userName: response.data.userName,
          password: response.data.password,
          email: response.data.email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user, userName, password, email, Birthday, FavoriteMovies } = this.state;

    return (
      <Router>
        <Route exact path="/" render={() => {
          console.log('login')
          if (user) return <Navbar user={user}></Navbar>
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        }} />
        {/* Registration view */}
        <Route exact path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <Col>
            <RegistrationView
            />
          </Col>
        }} />
        <div className="main-view">
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              return movies.map(m => (
                <Col lg={3} md={6} sm={9} xs={6} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <Navbar user={user}></Navbar>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <Navbar user={user} ></Navbar>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );

              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <Navbar user={user}></Navbar>
                <DirectorView Director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            {/* Profile view  */}
            <Route path="/user" render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <>
                  <Col>
                    <Navbar user={user}></Navbar>
                    <Userview
                      userName={userName} password={password} email={email}
                      Birthday={Birthday} FavoriteMovies={FavoriteMovies} movies={movies}
                      getUser={this.getUser}
                      onBackClick={() => history.goBack()} removeMovie={(_id) => this.onRemoveFavoriteMovies(_id)} />
                  </Col>
                </>)
            }} />
          </Row>
        </div>
      </Router>
    );
  }
}