import React, { PropTypes, Component } from 'react';
import DraggableControl from '../drag/DraggableControl';
import './PS4Source.css';

export default class PS4Source extends Component {

  static propTypes = {
    scaleStyle: PropTypes.object.isRequired,
    dragCtrlProps: PropTypes.object.isRequired,
  }

  render() {
    const { scaleStyle, dragCtrlProps } = this.props;
    return (
      <div className="artboard-source" style={scaleStyle}>
        <div className="background" />
        <DraggableControl control="PS4L1"
          left={54} top={5} {...dragCtrlProps} />
        <DraggableControl control="PS4L2"
          left={50} top={77} {...dragCtrlProps} />
        <DraggableControl control="PS4R1"
          left={403} top={5} {...dragCtrlProps} />
        <DraggableControl control="PS4R2"
          left={402} top={77} {...dragCtrlProps} />
        <DraggableControl control="PS4ShareFront" proxyControl="PS4Share"
          left={135} top={133} {...dragCtrlProps} />
        <DraggableControl control="PS4OptionsFront" proxyControl="PS4Options"
          left={366} top={133} {...dragCtrlProps} />
        <DraggableControl control="PS4StickLeftFront" proxyControl="PS4StickLeft"
          left={149} top={174} {...dragCtrlProps} />
        <DraggableControl control="PS4StickRightFront" proxyControl="PS4StickRight"
          left={316} top={174} {...dragCtrlProps} />
        <DraggableControl control="PS4DDownFront" proxyControl="PS4DDown"
          left={78} top={167} {...dragCtrlProps} />
        <DraggableControl control="PS4DUpFront" proxyControl="PS4DUp"
          left={72} top={151} {...dragCtrlProps} />
        <DraggableControl control="PS4DLeftFront" proxyControl="PS4DLeft"
          left={38} top={163} {...dragCtrlProps} />
        <DraggableControl control="PS4DRightFront" proxyControl="PS4DRight"
          left={112} top={162} {...dragCtrlProps} />
        <DraggableControl control="PS4XFront" proxyControl="PS4X"
          left={412} top={165} {...dragCtrlProps} />
        <DraggableControl control="PS4SquareFront" proxyControl="PS4Square"
          left={373} top={158} {...dragCtrlProps} />
        <DraggableControl control="PS4CircleFront" proxyControl="PS4Circle"
          left={458} top={158} {...dragCtrlProps} />
        <DraggableControl control="PS4TriangleFront" proxyControl="PS4Triangle"
          left={420} top={151} {...dragCtrlProps} />
        <DraggableControl control="PS4L2Top" proxyControl="PS4L2"
          left={65} top={319} {...dragCtrlProps} />
        <DraggableControl control="PS4R2Top" proxyControl="PS4R2"
          left={390} top={319} {...dragCtrlProps} />
        <DraggableControl control="PS4Share"
          left={147} top={340} {...dragCtrlProps} />
        <DraggableControl control="PS4Options"
          left={353} top={340} {...dragCtrlProps} />
        <DraggableControl control="PS4DUp"
          left={80} top={360} {...dragCtrlProps} />
        <DraggableControl control="PS4DLeft"
          left={38} top={405} {...dragCtrlProps} />
        <DraggableControl control="PS4DRight"
          left={102} top={405} {...dragCtrlProps} />
        <DraggableControl control="PS4DDown"
          left={80} top={425} {...dragCtrlProps} />
        <DraggableControl control="PS4PS4"
          left={247} top={479} {...dragCtrlProps} />
        <DraggableControl control="PS4StickLeft"
          left={122} top={439} {...dragCtrlProps} />
        <DraggableControl control="PS4StickRight"
          left={296} top={439} {...dragCtrlProps} />
        <DraggableControl control="PS4Triangle"
          left={407} top={363} {...dragCtrlProps} />
        <DraggableControl control="PS4Square"
          left={371} top={399} {...dragCtrlProps} />
        <DraggableControl control="PS4Circle"
          left={442} top={399} {...dragCtrlProps} />
        <DraggableControl control="PS4X"
          left={407} top={435} {...dragCtrlProps} />
      </div>
    );
  }

}
