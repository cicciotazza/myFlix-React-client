import React from 'react';
//axios needed to fetch movies from db
import axios from 'axios';
import PropTypes from "prop-types";
import './main-view.scss';

//LoginView at the top of the code because it will need to get the user details from the MainView
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        //this initial state is null
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

    //note 3.4
    //When clicking a movie, this function is invoked and updates the state of the selectedMovie property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: Movie
        });
    }

    //When a user successfully register himself
    onRegistration(register) {
        this.setState({
            register,
        });
    }

    //When user successfully logs in, this function updates the user property in state to that *particular user*/
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;
        //if there is no user, the LoginView is rendered
        //if there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />);
        // Before the movies have been loaded
        if (movies.length === 0)
            return <div className="main-view">Loading...</div>;

        return (
            //If the state of selectedMovie not null, that selected movie will be returned
            //else all movies will be returned
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