import React, { Component, PropTypes } from 'react';

export default class PlayItem extends Component {

  static propTypes = {
    control: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    left: PropTypes.number,
    top: PropTypes.number,
    scale: PropTypes.number,
  }

  render() {
    const { left, top, control, view } = this.props;
    const style = {
      left: `${left || 0}px`,
      top: `${top || 0}px`,
    };
    const className = `device-source-item play-item ${control} ${view}`;
    return (
      <div style={style} className={className} />
    );
  }
}
