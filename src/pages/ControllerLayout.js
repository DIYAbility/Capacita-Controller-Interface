import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';
import Artboard from '../components/Artboard';
import { createLayout } from '../actions/actions-app';
import './ControllerLayout.css';

class ControllerLayout extends Component {

  render() {
    return (
      <div className="controller-layout">
        <Navbar>
          <Grid>
            <Navbar.Header>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>

            </Navbar.Collapse>
          </Grid>
        </Navbar>

        <div className="artboard-container">
          <Artboard {...this.props} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { layout, dispatch } = this.props;
    if (!layout) {
      dispatch(createLayout());
    }
  }
}

const mapStateToProps = (state, props) => {
  const { app } = state;
  return {
    layout: (app.activeLayoutIndex < 0) ? null : app.layouts[app.activeLayoutIndex]
  };
}

export default connect(mapStateToProps)(ControllerLayout);
