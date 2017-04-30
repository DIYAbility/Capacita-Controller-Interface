import React, { Component, PropTypes } from 'react';
import Command from '../util/Command';
import './PlayItem.css';

const commands = {};

export default class PlayItem extends Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
    this.onKeyDownBound = this.onKeyDown.bind(this);
    this.onKeyUpBound = this.onKeyUp.bind(this);
    this.onUpBound = this.onUp.bind(this);
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
    window.addEventListener('mouseup', this.onUpBound, false);
    this.press();
  }

  onUp(event) {
    window.removeEventListener('mouseup', this.onUpBound, false);
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
      const ctrl = this.props.control;
      if (commands[ctrl.name]) {
        cancelCommand(ctrl.name);
      }
      commands[ctrl.name] = new Command({
        ctrl, 
        activate: this.activate.bind(this), 
        deactivate: this.deactivate.bind(this),
        complete: this.complete.bind(this), 
      });
      commands[ctrl.name].start();
    }
  }

  release() {
    if (this.mounted) {
      const ctrl = this.props.control;
      if (commands[ctrl.name]) {
        commands[ctrl.name].stop();
      }
    }
  }

  activate() {
    this.setState({ active: true });
  }

  deactivate() {
    this.setState({ active: false });
  }

  complete() {
    this.setState({ active: false });
    cancelCommand(this.props.control.name);
  }
}

// @param name Id of the controller button
function cancelCommand(name) {
  if (commands[name]) {
    const cmd = commands[name];
    delete commands[name];
    cmd.destroy();
  }
}
