import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';

// { useState } Reat Hook  https://reactjs.org/docs/hooks-state.html
export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //Change the state of MainView for registering and logging-ing, sending a request to the server for authenticate
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onRegistration(username);
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

//Information about data when not matching the requested input
RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};