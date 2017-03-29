import React, { Component, PropTypes } from 'react';
import './Playboard.css';

export default class Playboard extends Component {

  static propTypes = {
    layout: PropTypes.object.isRequired,
  }

  render() {
    const { view } = this.props.layout;
    const className = `playboard ${view}`;
    return (
      <div className={className}>

      </div>
    );
  }
}
