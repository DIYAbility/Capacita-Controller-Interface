import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button } from 'react-bootstrap';
import { signin } from '../actions/actions-user';

class SignIn extends Component {

  render() {
    return (
      <div className="page">
        <PageHeader>Sign In</PageHeader>
        <Button bsStyle="primary" onClick={this.onSignIn.bind(this)}>Sign In</Button>
      </div>
    );
  }

  onSignIn() {
    this.props.dispatch(signin());
  }
}

const mapStateToProps = (state, props) => {
  return state;
}

export default connect(mapStateToProps)(SignIn);
