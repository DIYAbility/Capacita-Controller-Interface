import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import BackgroundFront from '../components/xbox/BackgroundFront';
import BackgroundTop from '../components/xbox/BackgroundTop';
import './ControllerLayout.css';

class ControllerLayout extends Component {

  render() {
    return (
      <div className="page">
        <PageHeader>Controller Layout</PageHeader>

        <div className="controller detailed">
          {BackgroundFront}
          {BackgroundTop}
        </div>
      </div>
    );
  }
}

export default ControllerLayout;
