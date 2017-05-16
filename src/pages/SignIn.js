import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button } from 'react-bootstrap';
import { signin, signUp } from '../actions/actions-app';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };

    this.signUp = this.onCreateAcct;
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    return (
      <div className="page">
        <PageHeader>Sign In</PageHeader>
        <form>
        <p><label>Email: <input type="email" name="email"  onChange={ this.handleChange }/></label></p>
        <p><label>Password: <input type="password" name="password"  onChange={ this.handleChange }  /></label></p>
        <Button bsStyle="primary" onClick={this.onSignIn.bind(this)}>Sign In</Button>
        </form>
        <hr />
        <div>
          <h3>Sign up</h3>
          <form>
          <p><label>Name: <input type="text" name="name"  onChange={ this.handleChange } /></label></p>
          <p><label>Email: <input type="email" name="email"   onChange={ this.handleChange } /></label></p>
          <p><label>Password: <input type="password" name="password"  onChange={ this.handleChange } /></label></p>
          <Button bsStyle="primary" onClick={ this.signUp.bind(this) }>Sign Up</Button>
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
    this.props.dispatch(signin(this.state.email, this.state.password));
  }

  onCreateAcct() {
    this.props.dispatch(signUp(this.state.name, this.state.email, this.state.password));
  }
}

const mapStateToProps = (state, props) => {
  return state.app;
}

export default connect(mapStateToProps)(SignIn);
