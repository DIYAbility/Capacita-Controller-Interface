import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { DEVICE_CONTROL } from '../constants/drag-types';
import DraggableControl from '../components/DraggableControl';

const dropTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const offset = monitor.getSourceClientOffset();
    // TODO: call Redux Action with {item}
    return {
      control: item.control,
      left: item.left,
      top: item.top,
      x: offset.x,
      y: offset.y,
    };
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
    this.state = { items: [] };
  }

  static propTypes = {
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    drop: PropTypes.object,
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    const style = { borderColor: isOver ? '#ff0' : '#ccc' }
    return connectDropTarget(
      <div className="artboard-section layout" style={style}>
        {this.renderDroppedItems()}
      </div>
    );
  }

  renderDroppedItems() {
    // console.log(this.props)
    return null;
    // const x = drop ? drop.x : 0;
    // const y = drop ? drop.y : 0;
    // const style = { position: 'absolute', left: `${x}px`, top: `${y}px` };
    // return (
    //   <div style={style}>
    //     <DraggableControl control="XboxLeftStick" />
    //   </div>
    // );
  }

  componentDidUpdate(prevProps, prevState) {
    const { drop } = this.props;
    if (drop) {
      this.state.items.push(drop);
    }
  }
}

export default DropTarget(DEVICE_CONTROL, dropTarget, collect)(LayoutTarget);
