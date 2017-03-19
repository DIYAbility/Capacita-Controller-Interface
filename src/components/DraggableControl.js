import React, { Component, PropTypes } from 'react';
import XboxComponents from './xbox/XboxComponents';
import { DEVICE_CONTROL } from '../constants/drag-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const dragCtrlSource = {
  beginDrag(props, monitor, component) {
    const { control, proxyControl, view, scale, index } = props;
    return {
      control: proxyControl || control,
      view, scale: scale || 0, index
    };
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
    proxyControl: PropTypes.string,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    view: PropTypes.string.isRequired,
    left: PropTypes.number,
    top: PropTypes.number,
    scale: PropTypes.number,
    index: PropTypes.number,
  }

  render() {
    const { connectDragSource, isDragging, left, top, control, view } = this.props;
    const style = {
      opacity: isDragging ? 0 : 1,
      left: `${left || 0}px`,
      top: `${top || 0}px`,
    };
    return connectDragSource(
      <div style={style}>
        <div className={`drag-layer ${control} ${view}`} />
      </div>
    );
    // {this.renderControl()}
  }

  renderControl() {
    const { control, view } = this.props;
    const XboxComponent = XboxComponents[control];
    return <XboxComponent view={view} />;
  }

  componentDidMount() {
     this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }
}

export default DragSource(DEVICE_CONTROL, dragCtrlSource, collect)(DraggableControl);
