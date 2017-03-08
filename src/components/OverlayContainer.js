import React, { Component, PropTypes } from 'react';
import './OverlayContainer.css';

class OverlayContainer extends Component {

  render() {
    return (
      <div className="overlay-container">
        {this.props.children}
      </div>
    );
  }
}

export default OverlayContainer;
