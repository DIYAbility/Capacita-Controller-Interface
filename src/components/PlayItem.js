import React, { Component, PropTypes } from 'react';
import './PlayItem.css';

export default class PlayItem extends Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
    this.onKeyDownBound = this.onKeyDown.bind(this);
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
  }

  componentWillUnmount() {
    if (this.props.control.keyboardShortcut) {
      window.removeEventListener('keydown', this.onKeyDownBound);
    }
  }

  onDown(event) {
    console.log('DOWN');
    window.addEventListener('mouseup', this.onUp.bind(this), false);
    this.setState({ active: true });
  }

  onKeyDown(event) {
    const ks = this.props.control.keyboardShortcut;
    console.log('onKeyDown()', ks);
    if (ks && event.key.toUpperCase() === ks) {
      this.setState({ active: true });
    }
  }

  onUp(event) {
    console.log('UP');
    window.removeEventListener('mouseup', this.onUp.bind(this), false);
    this.setState({ active: false });
  }
}
