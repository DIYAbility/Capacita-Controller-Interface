import React, { Component, PropTypes } from 'react';
import LeftStick from './xbox/LeftStick';
import { STICK } from '../constants/drag-types';
import { DragSource } from 'react-dnd';

const dragCtrlSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class DraggableControl extends Component {

  static propTypes = {
    control: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    const style = {
      opacity: isDragging ? 0.25 : 1
    };
    return connectDragSource(
      <div style={style}>
        {this.renderControl()}
      </div>
    );
  }

  renderControl() {
    switch (this.props.control) {
      case 'LeftStick':
        return <LeftStick />;
      default:
        return null;
    }
  }


}

export default DragSource(STICK, dragCtrlSource, collect)(DraggableControl);
