import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';
// import * as actions from '../actions/actions-app';
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
              <NavItem eventKey={1} href="/#layout" >
                <span className="glyphicon glyphicon-plus" />
                Create layout
              </NavItem>
            </Nav>
            <Nav pullRight className="navbar-nostyle">
              <NavItem eventKey={1} href="/#help">Help</NavItem>
              {this.renderAccount()}
            </Nav>
          </Navbar.Collapse>
        </Grid>
      </Navbar>
    );
  }

  renderAccount() {
    const user = this.props.app.user;
    const href = user ? '/#account' : '/#signin';
    const label = user ? `${user.name}` : 'Sign in';
    return (
      <NavItem eventKey={2} href={href} className="border-left">
        {label}
      </NavItem>
    );
  }

  // onClick(event) {
  //   this.props.dispatch(actions.createLayout());
  // }
}

export default AppToolbar;
