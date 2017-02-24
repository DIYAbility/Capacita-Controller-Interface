import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';
import * as actions from '../actions/actions-app';
import './AppToolbar.css';

class AppToolbar extends Component {

  render() {
    return (
      <Navbar inverse fixedTop className="app-toolbar">
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Capacita</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav activeKey={1} bsStyle="pills" className="navbar-margin-left">
              <NavItem eventKey={1} onClick={this.onClick.bind(this)} >
                <span className="glyphicon glyphicon-plus" />
                Create Layout
              </NavItem>
            </Nav>
            <Nav pullRight className="navbar-nostyle">
              <NavItem eventKey={1} href="/#help">Help</NavItem>
              <NavItem eventKey={2} href="/#account" className="border-left">Account</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Grid>
      </Navbar>
    );
  }

  onClick(event) {
    this.props.dispatch(actions.createLayout());
  }
}

export default AppToolbar;
