import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  PageHeader,
  Button
} from 'react-bootstrap';
import FieldGroup from '../components/app/FieldGroup';
import { signin, signUp } from '../actions/actions-app';
import './SignIn.css';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      existEmail: '',
      existPassword: '',
    };
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    const { name, email, password, existEmail, existPassword } = this.state;
    return (
      <div className="page">
        <PageHeader>Sign In</PageHeader>

        <div className="form-inline">
          <form>
            <h3>Create a new account</h3>
            <FieldGroup
              id="signUpName"
              type="text"
              label="Name:"
              placeholder="Name"
              value={name}
              name="name"
              help="AAAAHHHhhh!!!!"
              onChange={this.onChange}
              validationState="error"
            />
            <FieldGroup
              id="signUpEmail"
              type="email"
              label="Email:"
              placeholder="Email"
              value={email}
              name="email"
              onChange={this.onChange}
              validationState="warning"
              help="Invalid"
            />
            <FieldGroup
              id="signUpPassword"
              type="password"
              label="Password:"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.onChange}
              validationState="success"
              help="good job"
            />
            <Button
              type="submit"
              bsStyle="primary"
              onClick={this.onSignUp}>
              Sign Up
            </Button>
          </form>
        </div>

        <div className="form-inline">
          <form>
            <h3>Have an account? Sign in</h3>
            <FieldGroup
              id="signInEmail"
              type="email"
              label="Email:"
              placeholder="Email"
              value={existEmail}
              name="existEmail"
              onChange={this.onChange}
            />
            <FieldGroup
              id="signInPassword"
              type="password"
              label="Password:"
              placeholder="Password"
              value={existPassword}
              name="existPassword"
              onChange={this.onChange}
              
            />
            <Button
              type="submit"
              bsStyle="primary"
              onClick={this.onSignIn}>
              Sign In
            </Button>
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

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  onSignIn() {
    this.props.dispatch(signin(this.state.email, this.state.password));
  }

  onSignUp() {
    this.props.dispatch(signUp(this.state.name, this.state.email, this.state.password));
  }
  
}

const mapStateToProps = (state, props) => {
  return state.app;
}

export default connect(mapStateToProps)(SignIn);

