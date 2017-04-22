import React, { Component, PropTypes } from 'react';
import * as device from '../util/device-output';
import './PlayItem.css';

export default class PlayItem extends Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
    this.onKeyDownBound = this.onKeyDown.bind(this);
    this.onKeyUpBound = this.onKeyUp.bind(this);
    this.mounted = false;
  }

  static propTypes = {
    control: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    scale: PropTypes.number,
  }

  render() {
    const { control, view } = this.props;
    const style = {
      left: `${control.x || 0}px`,
      top: `${control.y || 0}px`,
    };
    const active = this.state.active ? ' active' : '';
    const className = `device-source-item play-item ${control.name} ${view}${active}`;
    return (
      <div
        style={style}
        className={className}
        onMouseDown={this.onDown.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
      />
    );
  }

  componentDidMount() {
    if (this.props.control.keyboardShortcut) {
      window.addEventListener('keydown', this.onKeyDownBound);
    }
    this.mounted = true;
  }

  componentWillUnmount() {
    if (this.props.control.keyboardShortcut) {
      window.removeEventListener('keydown', this.onKeyDownBound);
    }
    this.mounted = false;
  }

  onDown(event) {
    window.addEventListener('mouseup', this.onUp.bind(this), false);
    this.press();
  }

  onUp(event) {
    window.removeEventListener('mouseup', this.onUp.bind(this), false);
    this.release();
  }

  onKeyDown(event) {
    if (!this.state.active &&
        event.key.toUpperCase() === this.props.control.keyboardShortcut) {
      window.addEventListener('keyup', this.onKeyUpBound);
      this.press();
    }
  }

  onKeyUp(event) {
    if (this.state.active &&
        event.key.toUpperCase() === this.props.control.keyboardShortcut) {
      window.removeEventListener('keyup', this.onKeyUpBound);
      this.release();
    }
  }

  press() {
    if (this.mounted) {
      device.press(this.props.control.name);
      this.setState({ active: true });
    }
  }

  release() {
    if (this.mounted) {
      device.release(this.props.control.name);
      this.setState({ active: false });
    }
  }
}
