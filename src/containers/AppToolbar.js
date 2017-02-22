import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Grid, Button } from 'react-bootstrap';
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
            <Button
              onClick={this.onClick.bind(this)}>
              <span className="glyphicon glyphicon-plus" />
              Create Layout
            </Button>
          </Navbar.Header>
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
