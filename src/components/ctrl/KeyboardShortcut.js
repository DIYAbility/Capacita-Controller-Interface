import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { updateControl } from '../../actions/actions-layout';

// const ALLOWED_REGEX = /^(Shift|Control|Meta|Alt|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|[a-z0-9])$/;

class KeyboardShortcut extends Component {

  static propTypes = {
    editId: PropTypes.string,
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { value: '', editing: false };
  }

  render() {
    const value = formatKeyCodes(this.state.value);
    return (
      <div className="input-row">
        <form>
          <FormGroup
            controlId="keyboardShortcut"
            validationState={this.getValidationState()}>
            <ControlLabel>Keyboard shortcut</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter shortcut"
              value={value}
              onKeyDown={this.onKeyDown.bind(this)}
              onKeyUp={this.onKeyUp.bind(this)}
              onChange={this.onChange.bind(this)}
            />
            <FormControl.Feedback />
            <HelpBlock>...</HelpBlock>
          </FormGroup>
        </form>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { editId, data } = nextProps
    const ctrl = data.grid[data.device][editId];
    const value = ctrl ? formatKeyCodes(ctrl.keyboardShortcut) : '';
    this.state = { value, editing: false };
  }

  getValidationState() {
    return null;
  }

  onChange(event) {
    //
  }

  onKeyDown(event) {
    if (/^Enter$/.test(event.key)) {
      this.dispatch();
      event.target.blur();
    } else if (/^(Backspace|Delete)$/.test(event.key)) {
      this.setState({ value: '', editing: false });
      this.dispatch();
      event.preventDefault();
    // } else if (ALLOWED_REGEX.test(event.key)) {
    } else if (/^[a-z0-9]$/.test(event.key)) {
      // const currentValue = this.state.editing ? this.state.value : '';
      // const value = addKeyCode(currentValue, event.key);
      const value = event.key.toUpperCase();
      this.setState({ value, editing: true });
      event.preventDefault();
    }
  }

  onKeyUp(event) {
    this.setState({ editing: false });
    this.dispatch();
  }

  dispatch() {
    const { editId, data } = this.props;
    const update = {
      device: data.device,
      editId,
      prop: 'keyboardShortcut',
      value: this.state.value,
    };
    this.props.dispatch(updateControl(update));
  }
}

// function addKeyCode(shortcut, code) {
//   const codes = (shortcut || '').split(',');
//   // Shortcuts have max length of 4 and cannot contain duplicate chars.
//   if (/^[a-z]$/.test(code)) {
//     code = code.toUpperCase();
//   }
//   if (codes.indexOf(code) === -1 && codes.length < 4) {
//     codes.push(code);
//   }
//   return codes.filter(item => !!item).join(',');
// }

// function removeLastCode(shortcut) {
//   if (shortcut) {
//     const codes = (shortcut || '').split(',');
//     codes.pop();
//     return codes.join(',');
//   }
//   return '';
// }

function formatKeyCodes(codes) {
  let str = '';
  if (codes) {
    codes = codes.split(',');
    codes.forEach(code => {
      switch (code) {
        case 'Shift':
          str += '⇧';
          break;
        case 'Control':
          str += '^';
          break;
        case 'Meta':
          str += '⌘';
          break;
        case 'Alt':
          str += '⌥';
          break;
        case 'ArrowLeft':
          str += '←';// ◀
          break;
        case 'ArrowRight':
          str += '→';// ▶
          break;
        case 'ArrowUp':
          str += '↑';// ▲
          break;
        case 'ArrowDown':
          str += '↓';// ▼
          break;
        default:
          str += code;
          break;
      }
    });
  }
  return str;
}

// function codesSorter(a, b) {
//   return 0;
// }

export default KeyboardShortcut;
