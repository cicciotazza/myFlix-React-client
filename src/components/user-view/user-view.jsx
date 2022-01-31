import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';

import { Button, Card, CardGroup, Col, Container, Form, Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';

import './user-view.scss';

export class Userview extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      password: null,
      email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    this.props.getUser()
  }

onRemoveFavorite = (e, movie) => {
    const userName = localStorage.getItem('userName');
    console.log(userName)
    const token = localStorage.getItem('token');
    console.log(this.props)

    axios.delete(`https://herokumyflixdb.herokuapp.com/users/${user}/movies/${_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert("Movie deleted");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteuserName() {
    const answer = window.confirm("Do you really want to delete your account permanently?");
    if (answer) {
      const token = localStorage.getItem("token");
      const userName = localStorage.getItem("userName");
      (`https://herokumyflixdb.herokuapp.com/users/${userName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert(userName + " has been deleted.");
          localStorage.removeItem('userName');
          localStorage.removeItem('token');
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        })
    };
  }

  editUser(e) {
    e.preventDefault();
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    axios.put(`https://herokumyflixdb.herokuapp.com/user/${userName}`,
      {
        userName: this.state.userName,
        password: this.state.password,
        email: this.state.email,
        Birthday: this.state.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          userName: response.data.userName,
          password: response.data.password,
          email: response.data.email,
          Birthday: response.data.Birthday
        });
        localStorage.setItem('userName', response.data.userName);
        const data = response.data;
        console.log(data);
        console.log(this.state.userName);
        alert('Profile updated');
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  setuserName(value) {
    this.state.userName = value;
  }

  setpassword(value) {
    this.state.password = value;
  }

  setemail(value) {
    this.state.email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { userName, email, Birthday, FavoriteMovies } = this.props
    console.log(this.props)

    return (
      <Container fluid className="UserView">
        <Row className="justify-content-md-center">
          <Col className="user-info">
            <div className="profileContent">
              <h1>Account settings</h1>
            </div>
            <h4>userName: {userName}</h4>
            <h4>password: *******</h4>
            <h4>email: {email}</h4>
            <h4>Birthday: {Birthday}</h4>
          </Col>
        </Row>
        <div className="profileInformation">
          <Form className="formDisplay" onSubmit={(e) => this.edituserName(e)}>
            <div>
              <h3>Edit Profile</h3>
            </div>
            <Form.Group>
              Username
              <Form.Control type='text' name="userName" placeholder="New userName" onChange={(e) => this.setuserName(e.target.value)} required />
            </Form.Group>

            <Form.Group>
              Password
              <Form.Control type='password' name="password" placeholder="New password" onChange={(e) => this.setpassword(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control type='email' name="email" placeholder="New email" onChange={(e) => this.setemail(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Birthday
              <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />

            </Form.Group>
            <div className="marginSpacer">
              <Col className="acc-btns mt-1">
                <Row>
                  <Button variant="success" size="lg" type="submit" >Update</Button>
                </Row>
                <Row>
                  <Button size="md" variant="outline-danger" size="lg" type="submit" onClick={() => this.deleteuserName()} >Delete Account</Button>
                </Row>
              </Col>
            </div>
          </Form>
        </div>

        <h3 className="favorite-Movies-title">Favorite Movies</h3>
        <Row className="favoriteMovied-col">
          {FavoriteMovies && FavoriteMovies.map((movie) => (

            <Col sm={6} md={4} lg={4} key={movie._id}>
              <div className="favoriteMoviediv" >
                <MovieCard movie={movie} />
                <Button bg="danger" variant="danger" className="unfav-button" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>
                  Delete From Favorites
                </Button>
              </div>
            </Col>
          ))
          }
        </Row>
      </Container>
    )
  }
}