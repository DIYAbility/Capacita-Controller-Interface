import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button } from 'react-bootstrap';
import { createAccount } from '../actions/actions-app';

class SignUp extends Component {

  render() {
    return (
      <div className="page">
        <PageHeader>Create Account</PageHeader>
        
        <form>
        <p><label>Name: <input type="text" /></label></p>
        <p><label>Email: <input type="email" /></label></p>
        <p><label>Password: <input type="password" /></label></p>
        <Button bsStyle="primary" onClick={this.createAccount.bind(this)}>Sign Up</Button>
        </form>
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
    if (!user) {
      window.location = '#signup';
    }
  }

  onCreateAcct() {
    this.props.dispatch(createAccount());
  }
}

const mapStateToProps = (state, props) => {
  return state.app;
}

export default connect(mapStateToProps)(SignUp);
