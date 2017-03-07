import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LayoutTarget from '../components/LayoutTarget';
import DeviceSource from '../components/DeviceSource';
import ControlDragLayer from '../components/ControlDragLayer';
import './Artboard.css';

class Artboard extends Component {

  static propTypes = {
    view: PropTypes.string.isRequired,
  }

  render() {
    const { view } = this.props;
    return (
      <div className="artboard-content edit-mode">
        <LayoutTarget {...this.props} />

        <DeviceSource view={view} />

        <ControlDragLayer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Artboard);
