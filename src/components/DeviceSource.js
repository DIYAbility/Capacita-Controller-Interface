import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import XboxBackgroundDetailed from '../components/xbox/XboxBackgroundDetailed';
import DraggableControl from '../components/DraggableControl';

const MARGIN = 30;

class DeviceSource extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scale: 1.0,
      offsetX: 0,
      offsetY: 0,
    };
  }

  render() {
    const { scale, offsetX, offsetY } = this.state;
    const scaleStyle = {
      transform: `scale(${this.state.scale})`,
      left: `${offsetX}px`,
      top: `${offsetY}px`,
    };
    return (
      <div className="artboard-section device-source">
        <div className="artboard-scale" style={scaleStyle}>
          <div className="background">
            <XboxBackgroundDetailed />
          </div>
          <DraggableControl control="XboxLeftStick" left={80} top={365} scale={scale} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.writeScale();
    window.addEventListener('resize', this.writeScale.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.writeScale.bind(this));
  }

  writeScale() {
    const thisEl = findDOMNode(this);
    const elRect = thisEl.getBoundingClientRect();
    const bgEl = thisEl.querySelector('.artboard-scale .background');
    const margin = MARGIN * 2;
    const elW = elRect.width - margin;
    const elH = elRect.height - margin;
    const scaleW = elW / bgEl.clientWidth;
    const scaleH = elH / bgEl.clientHeight;
    const scale = Math.min(scaleW, scaleH);
    const offsetX = (elRect.width - (scale * bgEl.clientWidth)) / 2;
    const offsetY = (elRect.height - (scale * bgEl.clientHeight)) / 2;
    this.setState({ scale, offsetX, offsetY });
  }
}

export default DeviceSource;