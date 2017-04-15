import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { DEVICE_CONTROL } from '../constants/drag-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import './DraggableControl.css';

const dragCtrlSource = {
  beginDrag(props, monitor, component) {
    const { control, proxyControl, view, scale, device, id } = props;
    return {
      control: proxyControl || control,
      view,
      device,
      scale: scale || 0,
      id,
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
    id: PropTypes.string,
    placed: PropTypes.bool,
  }

  render() {
    const { connectDragSource, isDragging, left, top, control, view } = this.props;
    const style = {
      opacity: isDragging ? 0 : 1,
      left: `${left || 0}px`,
      top: `${top || 0}px`,
      textAlign: 'center',
    };
    return connectDragSource(
      <div style={style} className="draggable-control">
        <div className={`device-source-item drag-layer ${control} ${view}`} />
        {this.renderButton()}
      </div>
    );
  }

  renderButton() {
    const { placed } = this.props;
    if (placed) {
      return (
        <Button className="btn-info" onClick={this.onInfoActivate.bind(this)}>
          <span className="glyphicon glyphicon-info-sign no-margin" />
        </Button>
      );
    }
    return null;
  }

  onInfoActivate(event) {
    console.log(`INFO: ${this.props.id}`);
  }

  componentDidMount() {
     this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }
}

export default DragSource(DEVICE_CONTROL, dragCtrlSource, collect)(DraggableControl);
