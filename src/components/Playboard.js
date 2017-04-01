import React, { Component, PropTypes } from 'react';
import PlayItem from './PlayItem';
import './Playboard.css';

export default class Playboard extends Component {

  static propTypes = {
    layout: PropTypes.object.isRequired,
  }

  render() {
    const { device, view } = this.props.layout;
    return (
      <div className={`artboard-content playboard ${device} ${view}`}>
        {this.renderItems()}
      </div>
    );
  }

  renderItems() {
    const layout = this.props.layout;
    if (layout) {
      const { grid, device } = layout;
      return grid[device].map((ctrl, index) => {
        return (
          <PlayItem
            control={ctrl.name}
            view={layout.view}
            left={ctrl.x}
            top={ctrl.y}
            key={index}
          />
        );
      })
    }
  }
}
