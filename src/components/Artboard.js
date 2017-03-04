import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LayoutTarget from '../components/LayoutTarget';
import DeviceSource from '../components/DeviceSource';
import ControlDragLayer from '../components/ControlDragLayer';
import './Artboard.css';

class Artboard extends Component {

  render() {
    return (
      <div className="artboard-content edit-mode">
        <LayoutTarget />

        <DeviceSource />

        <ControlDragLayer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Artboard);
