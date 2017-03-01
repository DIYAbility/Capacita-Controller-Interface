import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableControl from '../components/DraggableControl';
import LayoutTarget from '../components/LayoutTarget';

import SvgXbox from '../components/SvgXbox';

import './ControllerLayout.css';

class ControllerLayout extends Component {

  render() {
    return (
      <div className="page controller-layout">
        <PageHeader>Controller Layout</PageHeader>

        <div className="artboard">
          <LayoutTarget />

          <div className="controller detailed">
            <div>
              <SvgXbox href="bg-detailed" />
            </div>

            <DraggableControl control="LeftStick" />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(ControllerLayout);
