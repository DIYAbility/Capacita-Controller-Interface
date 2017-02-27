import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeAppPage } from '../actions/actions-app.js';
import * as page from '../constants/pages';
import AppToolbar from '../components/AppToolbar';
import SignIn from '../pages/SignIn';
import ControllerLayout from '../pages/ControllerLayout';
import Help from '../pages/Help';
import Account from '../pages/Account';
import NotFound from '../pages/NotFound';
import './App.css';

class App extends Component {


  render() {
    console.log(this.props.app.route)
    return (
      <div className="capacita-app">
        <AppToolbar {...this.props} />
        {this.renderPage()}
      </div>
    );
  }

  renderPage() {
    const { app } = this.props;
    switch (app.route[0]) {
      case page.SIGNIN:
        return <SignIn />;
      case page.LAYOUT:
        return <ControllerLayout />;
      case page.HELP:
        return <Help />;
      case page.ACCOUNT:
        return <Account />;
      default:
        return <NotFound />;
    }
  }

  componentWillMount() {
    this.onHashChange();
    window.addEventListener('hashchange', this.onHashChange.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange.bind(this), false);
  }

  onHashChange() {
    this.props.dispatch(changeAppPage(window.location.hash));
  }
}

const mapStateToProps = (state, props) => {
  return state;
}

export default connect(mapStateToProps)(App);
