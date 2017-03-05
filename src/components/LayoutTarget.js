import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import { DEVICE_CONTROL } from '../constants/drag-types';
import DraggableControl from '../components/DraggableControl';
import { moveControl } from '../actions/actions-layout';

const dropTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const sourceOffset = monitor.getSourceClientOffset();
    const clientOffset = monitor.getClientOffset();

    const { x: sx, y: sy } = sourceOffset;
    const { x: cx, y: cy } = clientOffset;
    const x = sx - (cx - sx) * item.scale;
    const y = sy - (cy - sy) * item.scale;

    const dropResult = {
      control: item.control,
      x,
      y,
      scale: item.scale,
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
    const rect = findDOMNode(this).getBoundingClientRect();
    this.setState({ offsetX: rect.left, offsetY: rect.top });
  }

  renderDroppedItems() {
    const { layout } = this.props;
    if (layout && !isNaN(this.state.offsetX)) {
      return layout.grid.map((item, index) => {
        if (item.x === undefined) {
          return null;
        }
        const x = item.x - this.state.offsetX;
        const y = item.y - this.state.offsetY;
        const style = { position: 'absolute', left: `${x}px`, top: `${y}px` };
        return (
          <div style={style} key={index}>
            <DraggableControl control="XboxLeftStick" />
          </div>
        );
      });
    }
  }
}

export default DropTarget(DEVICE_CONTROL, dropTarget, collect)(LayoutTarget);
