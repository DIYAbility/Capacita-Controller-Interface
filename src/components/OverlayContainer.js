import React, { Component } from 'react';
import './OverlayContainer.css';

class OverlayContainer extends Component {

  render() {
    return (
      <div className="overlay-container">
        <div className="pointer">
          <div className="inner" />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default OverlayContainer;
