import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';

class Account extends Component {

  render() {
    return (
      <div className="page">
        <PageHeader>Account</PageHeader>
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
      window.location = '#signin';
    }
  }
}

const mapStateToProps = (state, props) => {
  return state.app;
}

export default connect(mapStateToProps)(Account);
