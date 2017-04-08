import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactSuperSimpleRouter from '../components/ReactSuperSimpleRouter';
import * as page from '../constants/pages';
import { changeRoute } from '../actions/actions-app';
import AppToolbar from '../components/AppToolbar';
import SignIn from '../pages/SignIn';
import ControllerLayout from '../pages/ControllerLayout';
import Help from '../pages/Help';
import Account from '../pages/Account';
import NotFound from '../pages/NotFound';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="capacita-app">
        <ReactSuperSimpleRouter
          route={this.props.app.route}
          onChange={this.onRouteChange.bind(this)}
          unsaved={this.props.layout.ui.dirty}
        />
        <AppToolbar {...this.props} />
        {this.renderPage()}
      </div>
    );
  }

  onRouteChange(route) {
    this.props.dispatch(changeRoute(route));
  }

  renderPage() {
    switch (this.props.app.route[0]) {
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
}

const mapStateToProps = (state, props) => {
  return state;
}

export default connect(mapStateToProps)(App);
