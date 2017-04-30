import React, { Component, PropTypes } from 'react';
import './OverlayContainer.css';

class OverlayContainer extends Component {

  static propTypes = {
    pointer: PropTypes.string.isRequired,
    overlay: PropTypes.string,
  }

  render() {
    const overlay = this.props.overlay || '';
    const className = `overlay-container ${overlay}`;
    return (
      <div className={className}>
        <div className={`pointer pointer-${this.props.pointer}`}>
          <div className="inner" />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default OverlayContainer;
