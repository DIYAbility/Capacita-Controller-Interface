import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import XboxSource from './XboxSource';
import PS4Source from './PS4Source';

const MARGIN = 30;

class DeviceSource extends Component {

  static propTypes = {
    layout: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      scale: 1.0,
      offsetX: 0,
      offsetY: 0,
    };
  }

  render() {
    return (
      <div className="artboard-section device-source">
        {this.renderSource()}
      </div>
    );
  }

  renderSource() {
    const { scale, offsetX, offsetY } = this.state;
    const scaleStyle = {
      transform: `scale(${this.state.scale})`,
      left: `${offsetX}px`,
      top: `${offsetY}px`,
    };
    const { view, device } = this.props.layout;
    const dragCtrlProps = { scale, view, index: -1 };
    switch (device) {
      case 'xbox':
        return <XboxSource scaleStyle={scaleStyle} dragCtrlProps={dragCtrlProps} view={view} />;
      case 'ps4':
        return <PS4Source scaleStyle={scaleStyle} dragCtrlProps={dragCtrlProps} view={view} />;
      default:
        return null;
    }
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
    const bgEl = thisEl.querySelector('.artboard-source .background');
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
