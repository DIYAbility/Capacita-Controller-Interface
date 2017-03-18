import React, { PropTypes, Component } from 'react';
import PS4Background from '../components/ps4/PS4Background';
// import DraggableControl from '../components/DraggableControl';

export default class PS4Source extends Component {

  static propTypes = {
    scaleStyle: PropTypes.object.isRequired,
    dragCtrlProps: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
  }

  render() {
    const { scaleStyle, dragCtrlProps, view } = this.props;
    return (
      <div className="artboard-scale" style={scaleStyle}>
        <div className="background">
          <PS4Background view={view} />
        </div>
      </div>
    );
  }
}
