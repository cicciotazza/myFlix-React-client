import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';

import { Button, Card, CardGroup, Col, Container, Form, Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';

import './visibility-filter-input.scss'

function VisibilityFilterInput(props) {
    return <Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="filter"
    />;
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);