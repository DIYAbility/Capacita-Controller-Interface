import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DEVICE_CONTROL } from '../../constants/drag-types';
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
    onEdit: PropTypes.func,
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
    const { onEdit, editItem } = this.props;
    if (onEdit) {
      const editClass = (editItem === this.props.id) ? ' editing' : '';
      const className = `btn-info${editClass}`;
      return (
        <Button className={className} onClick={this.onInfoActivate.bind(this)}>
          <span className="glyphicon glyphicon-info-sign no-margin" />
        </Button>
      );
    }
    return null;
  }

  onInfoActivate(event) {
    this.props.onEdit({
      id: this.props.id,
      target: event.target,
    });
  }

  componentDidMount() {
     this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }
}

export default DragSource(DEVICE_CONTROL, dragCtrlSource, collect)(DraggableControl);
