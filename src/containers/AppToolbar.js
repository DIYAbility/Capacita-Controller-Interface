import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as actions from '../actions/actions-app';

class AppToolbar extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <p>AppToolbar</p>
        <p>
          <Button
            onClick={this.onClick.bind(this)}>
            Create Layout
          </Button>
        </p>
      </div>
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
