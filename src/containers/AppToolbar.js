import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';
import * as actions from '../actions/actions-app';
import './AppToolbar.css';

class AppToolbar extends Component {

  render() {
    console.log(this.props)
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
            <Nav pullRight bsStyle="pills">
              <NavItem eventKey={1} href="#" className="navbar-margin-right">Help</NavItem>
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

const mapStateToProps = (state, props) => {
  return state.app;
}

export default connect(mapStateToProps)(AppToolbar);
