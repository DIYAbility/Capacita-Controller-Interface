import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button } from 'react-bootstrap';
import { signin } from '../actions/actions-app';

class SignIn extends Component {

  render() {
    return (
      <div className="page">
        <PageHeader>Sign In</PageHeader>
        <Button bsStyle="primary" onClick={this.onSignIn.bind(this)}>Sign In</Button>
      </div>
    );
  }

  componentDidMount() {
    this.changePage(this.props.user);
  }

  componentWillUpdate(nextProps) {
    this.changePage(nextProps.user);
  }

  changePage(user) {
    if (user) {
      window.location = '#account';
    }
  }

  onSignIn() {
    this.props.dispatch(signin());
  }
}

const mapStateToProps = (state, props) => {
  return state.app;
}

export default connect(mapStateToProps)(SignIn);
