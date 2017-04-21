import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { updateControl } from '../../actions/actions-layout';

class KeyboardShortcut extends Component {

  static propTypes = {
    editId: PropTypes.string,
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    // Setting FormControl/input as a controlled input nested inside am
    // Overlay throws an error on keyboard "Esc"!!!
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
              onFocus={this.onInputFocus.bind(this)}
              onBlur={this.onInputBlur.bind(this)}
            />
            <FormControl.Feedback />
            <HelpBlock>...</HelpBlock>
          </FormGroup>
        </form>
      </div>
    );
  }

  componentDidUpdate() {
    const { editId, data } = this.props;
    const ctrl = data.grid[data.device][editId];
    if (ctrl) {
      const value = formatKeyCodes(ctrl.keyboardShortcut || '');
      console.log('display: ', value);
      const input = findDOMNode(this).querySelector('input[type="text"');
      input.value = value;
    }
  }

  getValidationState() {
    return null;
  }

  onInputFocus() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onInputBlur() {
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(event) {
    const regex = /^(Backspace|Delete|Shift|Control|Meta|Alt|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|[a-zA-Z0-9])$/;
    let key = event.key;
    if (key === 'Enter') {
      event.target.blur();
    } else {
      if (regex.test(key)) {
        event.preventDefault();
        if (key.length === 1) {
          key = key.toUpperCase();
        }
        const { editId, data } = this.props;
        const ctrl = data.grid[data.device][editId];
        if (ctrl) {
          const value = (key === 'Backspace' || key === 'Delete') ?
            removeLastCode(ctrl.keyboardShortcut) :
            addKeyCode(ctrl.keyboardShortcut, key);
          const update = {
            device: data.device,
            editId,
            prop: 'keyboardShortcut',
            value,
          };
          this.props.dispatch(updateControl(update));
        }
      }
    }
  }
}

function addKeyCode(shortcut, code) {
  shortcut = shortcut || '';
  if (shortcut) {
    shortcut += ',';
  }
  shortcut += code;
  return shortcut;
}

function removeLastCode(shortcut) {
  if (shortcut) {
    const codes = (shortcut || '').split(',');
    codes.pop();
    return codes.join(',');
  }
  return '';
}

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

export default KeyboardShortcut;
