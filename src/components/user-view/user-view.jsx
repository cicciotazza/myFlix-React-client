import React from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
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

  onRemoveFavoriteMovies = (e, movie) => {
    const userName = localStorage.getItem('user');
    console.log(userName)
    const token = localStorage.getItem('token');
    console.log(this.props)
    axios.delete
      (`https://herokumyflixdb.herokuapp.com/users/${userName}/movies/${movie._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteUser() {
    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      axios.delete(`https://herokumyflixdb.herokuapp.com/users/${user}`,

        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert(user + " has been deleted.");
          localStorage.removeItem('user');
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
    const userName = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.put(`https://herokumyflixdb.herokuapp.com/users/${userName}`,
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
        localStorage.setItem('user', response.data.userName);
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
      <Container className="UserView">
        <Row className="justify-content-md-center">
          <Col className="user-info">
            <div className="profileContent">
              <h1>MY PROFILE</h1>
            </div>
            <h4>Username: {userName}</h4>
            <h4>Password: *******</h4>
            <h4>Email: {email}</h4>
            <h4>Birthday: {Birthday}</h4>
          </Col>
        </Row>
        <div className="profileInformation">

          <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
            <div>
              <h3>EDIT PROFILE</h3>
            </div>
            <Form.Group>
              Username
              <Form.Control type='text' name="userName" placeholder="New Username" onChange={(e) => this.setuserName(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              Password
              <Form.Control type='password' name="password" placeholder="New Password" onChange={(e) => this.setpassword(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control type='email' name="email" placeholder="New Email" onChange={(e) => this.setemail(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              Birthday
              <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
            </Form.Group>
            <div className="marginSpacer">
              <Button variant="success" type="submit" >Update</Button>
            </div>
          </Form>
        </div>
        <Row>
          <Col className="acc-btns mt-1">
            <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
          </Col>
        </Row>

        <h3 className="favorite-Movies-title">Favorite Movies</h3>

        <Row className="favoriteMovied-col">
          {FavoriteMovies && FavoriteMovies.map((movie) => (

            <Col sm={6} md={4} lg={4} key={movie._id}>
              <div className="favoriteMoviediv" >
                <MovieCard movie={movie} />
                <Button bg="danger" variant="danger" className="unfav-button" value={movie._id} onClick={(e) => this.onRemoveFavoriteMovies(e, movie)}>
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