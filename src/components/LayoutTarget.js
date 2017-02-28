import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { STICK } from '../constants/drag-types';
import LeftStick from './xbox/LeftStick';

const dropTarget = {
  drop(props, monitor) {
    // console.log(props);
    // console.log(monitor.getItem());
    // console.log(monitor.getDifferenceFromInitialOffset())
    // console.log(monitor.getClientOffset())
    // console.log(monitor.getSourceClientOffset())

  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    drop: monitor.getSourceClientOffset(),
  };
}

class LayoutTarget extends Component {

  static propTypes = {
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  }

  render() {
    const { connectDropTarget, isOver, drop } = this.props;
    const style = { borderColor: isOver ? '#ff0' : '#ccc' }
    return connectDropTarget(
      <div className="layout" style={style}>
        {this.renderControl(drop)}
      </div>
    );
  }

  renderControl(drop) {
    if (drop) {
      console.log(drop)
      const style = {
        position: 'absolute',
        left: drop.x,
        top: drop.y,
      };
      return (
        <div style={style}>
          <LeftStick />
        </div>
      );
    }
    return null;
  }
}

export default DropTarget(STICK, dropTarget, collect)(LayoutTarget);
