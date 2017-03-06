import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import { DEVICE_CONTROL } from '../constants/drag-types';
import DraggableControl from '../components/DraggableControl';
import { moveControl, updateTargetOffset } from '../actions/actions-layout';

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
    // this.setState({ offsetX: rect.left, offsetY: rect.top });
    this.props.dispatch(updateTargetOffset(-rect.left, -rect.top))
  }

  // componentWillReceiveProps(nextProps) {
  //   const { layout } = this.props;
  //   const { nextLayout } = nextProps;
  //   if (nextLayout) {
  //     // TODO: account for device change
  //     nextLayout.grid.forEach((item, index) => {
  //       if (item.x !== undefined) {
  //
  //       }
  //     });
  //   }
  // }

  renderDroppedItems() {
    const { layout } = this.props;
    if (layout) {
      return layout.grid.map((item, index) => {
        if (item.x === undefined) {
          return null;
        }
        // const x = item.x - this.state.offsetX;
        // const y = item.y - this.state.offsetY;
        return (
          <DraggableControl
            control="XboxLeftStick"
            left={item.x}
            top={item.y}
            scale={0}
            key={index} />
        );
      });
    }
  }
}

export default DropTarget(DEVICE_CONTROL, dropTarget, collect)(LayoutTarget);
