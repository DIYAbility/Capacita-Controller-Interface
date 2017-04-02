import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LayoutTarget from '../components/LayoutTarget';
import DeviceSource from '../components/DeviceSource';
import ControlDragLayer from '../components/ControlDragLayer';
import './Artboard.css';

class Artboard extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }

  render() {
    const { view, device } = this.props.data;
    const className = `artboard-content edit-mode ${view} ${device}`;
    return (
      <div className={className}>
        <LayoutTarget {...this.props} />
        <DeviceSource {...this.props} />
        <ControlDragLayer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Artboard);
