import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableControl from '../components/DraggableControl';
import LayoutTarget from '../components/LayoutTarget';

// import BackgroundFront from '../components/xbox/BackgroundFront';
// import BackgroundTop from '../components/xbox/BackgroundTop';
import './ControllerLayout.css';

class ControllerLayout extends Component {

  render() {
    return (
      <div className="page controller-layout">
        <PageHeader>Controller Layout</PageHeader>

        <div className="artboard">
          <LayoutTarget />

          <div className="controller detailed">
            <DraggableControl control="LeftStick" />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(ControllerLayout);
