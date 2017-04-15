import React, { Component, PropTypes } from 'react';
import { changeName } from '../actions/actions-layout';
import './LayoutTitle.css';

class LayoutTitle extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    const data = this.props.data;
    return (
      <div className="layout-title">
        <small>{actionText(data.mode)}</small>
        {this.renderName()}
      </div>
    );
  }

  renderName() {
    const data = this.props.data;
    if (data.mode === 'edit') {
      if (this.state.editing) {
        return (
          <input
            type="text"
            value={data.name}
            onChange={this.onNameChange.bind(this)}
            onKeyPress={this.onKeyPress.bind(this)}
            onBlur={this.onNameBlur.bind(this)}
            ref="input-name"
          />
        );
      }
      return (
        <h5 onMouseDown={this.onNameActivate.bind(this)}>{data.name}</h5>
      );
    }
    return (<h5>{data.name}</h5>)
  }

  componentDidUpdate() {
    const input = this.refs['input-name'];
    if (input && document.activeElement !== input) {
      requestAnimationFrame(() => {
        input.focus();
      });
    }
  }

  onNameActivate(event) {
    this.setState({ editing: true });
  }

  onNameChange(event) {
    this.props.dispatch(changeName(event.target.value));
  }

  onKeyPress(event) {
    if (event.which === 13) {
      event.target.blur();
    }
  }

  onNameBlur(event) {
    this.setState({ editing: false });
  }
}

function actionText(mode) {
  return (mode === 'edit') ? 'Currently editing' : 'Currently playing';
}

export default LayoutTitle;
