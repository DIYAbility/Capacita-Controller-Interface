import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import { DEVICE_CONTROL } from '../../constants/drag-types';
import DraggableControl from '../drag/DraggableControl';
import { moveControl, updateTargetOffset } from '../../actions/actions-layout';

const dropTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    // Item dragged is scaled to fit inside the device source section, so this
    // scale must be accounted for in the x and y of a drop position.
    const sourceOffset = monitor.getSourceClientOffset();
    const clientOffset = monitor.getClientOffset();
    const scale = (item.scale === 0) ? 0 : (1 - item.scale);
    const { x: sx, y: sy } = sourceOffset;
    const { x: cx, y: cy } = clientOffset;
    const x = sx - (cx - sx) * scale;
    const y = sy - (cy - sy) * scale;
    const dropResult = {
      x, y,
      control: item.control,
      device: item.device,
      id: item.id,
    };
    props.dispatch(moveControl(dropResult));
    return dropResult;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    drop: monitor.getDropResult(),
  };
}

class LayoutTarget extends Component {

  constructor(props) {
    super(props);
    this.state = { offsetX: 0/0, offsetY: 0/0 };
  }

  static propTypes = {
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    onItemEdit: PropTypes.func.isRequired,
    editItem: PropTypes.string,
    data: PropTypes.object.isRequired,
    drop: PropTypes.object,
  }

  render() {
    return this.props.connectDropTarget(
      <div className="artboard-section layout">
        {this.renderDroppedItems()}
      </div>
    );
  }

  componentDidMount() {
    // Dropped item x and y are relative to the entire document but the items
    // are dropped onto this particular layer, so dropped item's x and y must
    // be offset by this layer's x and y.
    const rect = findDOMNode(this).getBoundingClientRect();
    this.props.dispatch(updateTargetOffset(-rect.left, -rect.top))
  }

  renderDroppedItems() {
    const { grid, device, view } = this.props.data;
    return Object.keys(grid[device]).map((id, index) => {
      const ctrl = grid[device][id];
      return (
        <DraggableControl
          control={ctrl.name}
          view={view}
          device={device}
          left={ctrl.x}
          top={ctrl.y}
          id={id}
          onEdit={this.props.onItemEdit}
          editItem={this.props.editItem}
          key={index}
        />
      );
    });
  }
}

export default DropTarget(DEVICE_CONTROL, dropTarget, collect)(LayoutTarget);
