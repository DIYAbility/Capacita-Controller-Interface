import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button } from 'react-bootstrap';
import { signin, createAccount } from '../actions/actions-app';

class SignIn extends Component {

  render() {
    return (
      <div className="page">
        <PageHeader>Sign In</PageHeader>
        <form>
        <p><label>Email: <input type="email" /></label></p>
        <p><label>Password: <input type="password" /></label></p>
        <Button bsStyle="primary" onClick={this.onSignIn.bind(this)}>Sign In</Button>
        </form>
        <hr />
        <div>
          <h3>Sign up</h3>
          <form>
          <p><label>Name: <input type="text" /></label></p>
          <p><label>Email: <input type="email" /></label></p>
          <p><label>Password: <input type="password" /></label></p>
          <Button bsStyle="primary" onClick={this.createAccount.bind(this)}>Sign Up</Button>
          </form>
        </div>
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

  onCreateAcct() {
    this.props.dispatch(createAccount());
  }
}

const mapStateToProps = (state, props) => {
  return state.app;
}

export default connect(mapStateToProps)(SignIn);
