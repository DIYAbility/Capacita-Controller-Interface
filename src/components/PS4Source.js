import React, { PropTypes, Component } from 'react';
import DraggableControl from '../components/DraggableControl';
import './PS4Source.css';

export default class PS4Source extends Component {

  static propTypes = {
    scaleStyle: PropTypes.object.isRequired,
    dragCtrlProps: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
  }

  render() {
    const { scaleStyle, dragCtrlProps, view } = this.props;
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
        <DraggableControl control="PS4Share"
          left={135} top={133} {...dragCtrlProps} />
        <DraggableControl control="PS4Options"
          left={366} top={133} {...dragCtrlProps} />
        <DraggableControl control="PS4StickLeftFront"
          left={149} top={174} {...dragCtrlProps} />
        <DraggableControl control="PS4StickRightFront"
          left={316} top={174} {...dragCtrlProps} />
        <DraggableControl control="PS4DDownFront"
          left={78} top={167} {...dragCtrlProps} />
        <DraggableControl control="PS4DUpFront"
          left={72} top={151} {...dragCtrlProps} />
        <DraggableControl control="PS4DLeftFront"
          left={38} top={163} {...dragCtrlProps} />
        <DraggableControl control="PS4DRightFront"
          left={112} top={162} {...dragCtrlProps} />
        <DraggableControl control="PS4XFront"
          left={412} top={165} {...dragCtrlProps} />
        <DraggableControl control="PS4SquareFront"
          left={373} top={158} {...dragCtrlProps} />
        <DraggableControl control="PS4CircleFront"
          left={458} top={158} {...dragCtrlProps} />
        <DraggableControl control="PS4TriangleFront"
          left={420} top={151} {...dragCtrlProps} />
      </div>
    );
  }

}
