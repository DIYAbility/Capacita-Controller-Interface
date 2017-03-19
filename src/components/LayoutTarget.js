import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import { DEVICE_CONTROL } from '../constants/drag-types';
import DraggableControl from '../components/DraggableControl';
import { moveControl, updateTargetOffset } from '../actions/actions-layout';

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
    const dropResult = { control: item.control, x, y, index: item.index };
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
    layout: PropTypes.object.isRequired,
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
    const { layout } = this.props;
    const items = [];
    if (layout) {
      let n = 0;
      Object.keys(layout.grid).forEach(control => {
        const item = layout.grid[control];
        for (let i = 0; i < item.instances.length; i++) {
          items.push(
            <DraggableControl
              control={control}
              view={layout.view}
              left={item.instances[i].x}
              top={item.instances[i].y}
              key={n++}
              index={i}
              />
          );
        }
      });
      return items;
    }
  }
}

export default DropTarget(DEVICE_CONTROL, dropTarget, collect)(LayoutTarget);
