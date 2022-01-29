//import React with initial value of my login variable (empty)
//useState creates a local state and preserves it between the render cycles
import React, { useState } from 'react';
import PropTypes from "prop-types";

import './login-view.scss';

// array of paired values destructured
export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //props.onLoggedIn allows to be automatically logged in—regardless of whether or not correct credentials
    // if refreshed, users will neet do login again
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //send a request to the server for authentication
        //call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    rreturn (
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      );
}

LoginView.propTypes = {
    login: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };