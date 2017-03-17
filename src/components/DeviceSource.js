import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import XboxBackground from '../components/xbox/XboxBackground';
import DraggableControl from '../components/DraggableControl';

const MARGIN = 30;

class DeviceSource extends Component {

  static propTypes = {
    view: PropTypes.string.isRequired,
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
    const { scale, offsetX, offsetY } = this.state;
    const scaleStyle = {
      transform: `scale(${this.state.scale})`,
      left: `${offsetX}px`,
      top: `${offsetY}px`,
    };
    const { view } = this.props;
    const dragCtrlProps = { scale, view, index: -1 };
    return (
      <div className="artboard-section device-source">
        <div className="artboard-scale" style={scaleStyle}>
          <div className="background">
            <XboxBackground view={this.props.view} />
          </div>
          <DraggableControl control="XboxDUp"
            left={182} top={455} {...dragCtrlProps} />
          <DraggableControl control="XboxDUpFront" proxyControl="XboxDUp"
            left={170} top={169} {...dragCtrlProps}/>
          <DraggableControl control="XboxDDown"
            left={182} top={511} {...dragCtrlProps}/>
          <DraggableControl control="XboxDLeft"
            left={152} top={486} {...dragCtrlProps}/>
          <DraggableControl control="XboxDRight"
            left={208} top={486} {...dragCtrlProps}/>
          <DraggableControl control="XboxStickLeft"
            left={80} top={365} {...dragCtrlProps} />
          <DraggableControl control="XboxStickLeftFront" proxyControl="XboxStickLeft"
            left={89} top={173} {...dragCtrlProps} />
          <DraggableControl control="XboxStickRight"
            left={280} top={443} {...dragCtrlProps} />
          <DraggableControl control="XboxStickRightFront" proxyControl="XboxStickRight"
            left={299} top={180} {...dragCtrlProps} />
          <DraggableControl control="XboxView"
            left={212} top={399} {...dragCtrlProps} />
          <DraggableControl control="XboxViewFront" proxyControl="XboxView"
            left={209} top={169} {...dragCtrlProps} />
          <DraggableControl control="XboxXbox"
            left={238} top={330} {...dragCtrlProps} />
          <DraggableControl control="XboxMenu"
            left={289} top={399} {...dragCtrlProps} />
          <DraggableControl control="XboxMenuFront" proxyControl="XboxMenu"
            left={289} top={169} {...dragCtrlProps} />
          <DraggableControl control="XboxX"
            left={340} top={392} {...dragCtrlProps} />
          <DraggableControl control="XboxY"
            left={376} top={358} {...dragCtrlProps} />
          <DraggableControl control="XboxB"
            left={412} top={392} {...dragCtrlProps} />
          <DraggableControl control="XboxXFront" proxyControl="XboxX"
            left={340} top={168} {...dragCtrlProps} />
          <DraggableControl control="XboxYFront" proxyControl="XboxY"
            left={382} top={166} {...dragCtrlProps} />
          <DraggableControl control="XboxBFront" proxyControl="XboxB"
            left={423} top={157} {...dragCtrlProps} />
          <DraggableControl control="XboxA"
            left={376} top={429} {...dragCtrlProps} />
          <DraggableControl control="XboxBumperLeft"
            left={63} top={95} {...dragCtrlProps} />
          <DraggableControl control="XboxBumperLeftTop" proxyControl="XboxBumperLeft"
            left={74} top={304} {...dragCtrlProps} />
          <DraggableControl control="XboxBumperRight"
            left={319} top={95} {...dragCtrlProps} />
          <DraggableControl control="XboxBumperRightTop" proxyControl="XboxBumperRight"
            left={329} top={304} {...dragCtrlProps} />
          <DraggableControl control="XboxTriggerLeft"
            left={60} top={14} {...dragCtrlProps} />
          <DraggableControl control="XboxTriggerRight"
            left={385} top={14} {...dragCtrlProps} />
          <DraggableControl control="XboxWirelessEnrollment"
            left={201} top={127} {...dragCtrlProps} />
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
