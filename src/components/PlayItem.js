import React, { Component, PropTypes } from 'react';
import './PlayItem.css';

export default class PlayItem extends Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

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
    const active = this.state.active ? ' active' : '';
    const className = `device-source-item play-item ${control} ${view}${active}`;
    return (
      <div
        style={style}
        className={className}
        onMouseDown={this.onDown.bind(this)}
      />
    );
  }

  onDown(event) {
    console.log('DOWN');
    window.addEventListener('mouseup', this.onUp.bind(this), false);
    this.setState({ active: true });
  }

  onUp(event) {
    console.log('UP');
    window.removeEventListener('mouseup', this.onUp.bind(this), false);
    this.setState({ active: false });
  }
}
