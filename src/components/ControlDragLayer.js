
import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import XboxLeftStick from './xbox/XboxLeftStick';

const constainerStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function itemStyle(props) {
  const { currentOffset, clientOffset, item } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }
  // The source is scaled down but the dragged item is 100% scale, to offset
  // the drag source by the scale so it appears in the correct position under
  // the pointer.
  const { x: ox, y: oy } = currentOffset;
  const { x: cx, y: cy } = clientOffset;
  const x = ox - (cx - ox) * item.scale;
  const y = oy - (cy - oy) * item.scale;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform,
  };
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    clientOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

class ControlDragLayer extends Component {

  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    isDragging: PropTypes.bool.isRequired,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
  }

  render() {
    const { isDragging, item } = this.props;
    return isDragging ? (
      <div style={constainerStyle}>
        <div style={itemStyle(this.props)}>
          {this.renderItem(item.control)}
        </div>
      </div>
    ) : null;
  }

  renderItem(control) {
    switch (control) {
      // case 'XboxLeftStick':
      default:
        return <XboxLeftStick />;
    }
  }
}

export default DragLayer(collect)(ControlDragLayer);
