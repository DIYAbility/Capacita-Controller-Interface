import React, { PropTypes, Component } from 'react';
import XboxBackground from '../components/xbox/XboxBackground';
import DraggableControl from '../components/DraggableControl';

export default class XboxSource extends Component {

  static propTypes = {
    scaleStyle: PropTypes.object.isRequired,
    dragCtrlProps: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
  }

  render() {
    const { scaleStyle, dragCtrlProps, view } = this.props;
    return (
      <div className="artboard-source xbox" style={scaleStyle}>
        <div className="background">
          <XboxBackground view={view} />
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
        <div className="XboxA detailed" style={{ position: 'absolute', top: '200px', left: '100px' }}/>
      </div>
    );
  }
}
