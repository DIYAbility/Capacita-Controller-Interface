import React, { Component, PropTypes } from 'react';
import XboxLeftStick from './xbox/XboxLeftStick';
import { DEVICE_CONTROL } from '../constants/drag-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const dragCtrlSource = {
  beginDrag(props, monitor, component) {
    const { control, view, scale } = props;
    return { control, view, scale: scale || 0 };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class DraggableControl extends Component {

  static propTypes = {
    control: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    view: PropTypes.string.isRequired,
    left: PropTypes.number,
    top: PropTypes.number,
    scale: PropTypes.number,
  }

  render() {
    const { connectDragSource, isDragging, left, top } = this.props;
    const style = {
      opacity: isDragging ? 0 : 1,
      left: `${left || 0}px`,
      top: `${top || 0}px`,
    };
    return connectDragSource(
      <div style={style}>
        {this.renderControl()}
      </div>
    );
  }

  renderControl() {
    switch (this.props.control) {
      case 'XboxLeftStick':
        return <XboxLeftStick view={this.props.view} />;
      default:
        return null;
    }
  }

  componentDidMount() {
     this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }
}

export default DragSource(DEVICE_CONTROL, dragCtrlSource, collect)(DraggableControl);
