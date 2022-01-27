//axios needed to fetch movies from db
import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import './main-view.scss';

//LoginView at the top of the code because it will need to get the user details from the MainView
//importing Login, Registration, MovieCard and movieview into MainView
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    //this initial state is null
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://herokumyflixdb.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //When clicking a movie, this function updates the state of the selectedMovie property to that movie*/
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    //When a user successfully register himself
    onRegistration(registration) {
        this.setState({
            registration,
        });
    }

    //When user successfully logs in, this function updates the user property in state to that *particular user*/
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user, registration } = this.state;
        //if there is no user, the LoginView is rendered
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        //if there is a user logged in, the user details are *passed as a prop to the LoginView
        if (!registration) return (<RegistrationView onRegistration={(registration) => this.onRegistration(registration)} />);

        // Before the movies have been loaded
        if (movies.length === 0)
            return
        <div className="main-view">Loading...</div>;

        return (
            //If the state of selectedMovie not null, that one will be returned, else all movies will be returned
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))
                }
            </div>
        );
    }
}