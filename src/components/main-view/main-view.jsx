import React from 'react';
//axios needed to fetch movies from db
import axios from 'axios';
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col, Card, CardGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import './main-view.scss';

//LoginView at the top of the code because it will need to get the user details from the MainView
//importing Login, Registration, MovieCard and movieview into MainView
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

    //this initial state is null
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: null
        }
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
            })
    }

    //When clicking a movie, this function updates the state of the selectedMovie property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    //When a user successfully register himself
    onRegistration(user) {
        this.setState({
            user
        });
    }

    //When user successfully logs in, this function updates the user property in state to that *particular user*/
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user, register, keyword } = this.state;

        //if there is a user logged in, the user details are *passed as a prop to the LoginView
        //if (!registration) return (<RegistrationView onRegistration={(registration) => this.onRegistration(registration)} />);
        if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;


        //if there is no user, the LoginView is rendered
        // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


                {selectedMovie
                    ? (
                        <Row className="justify-content-lg-center">
                            <Col lg={9} md={6}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        </Row>
                    )
                    : (
                        <Row className="justify-content-center">
                            {movies.map(movie => (
                                <Col lg={3} md={4} sm={6} xs={8}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            ))}
                        </Row>
                    )
                }
            </div>
        );
    }

}