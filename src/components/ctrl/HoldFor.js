import React, { Component, PropTypes } from 'react';
import { FormGroup } from 'react-bootstrap';
import { updateControl } from '../../actions/actions-layout';

class HoldFor extends Component {

  static propTypes = {
    editId: PropTypes.string,
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { editId, data } = this.props;
    const ctrl = data.grid[data.device][editId];
    const value = ctrl ? (+ctrl.holdFor || 0) : 0;
    return (
      <div className="input-row">
        <form>
          <FormGroup controlId="holdFor">
            Hold for
            <input
              type="number"
              className="form-control"
              value={value}
              min="0"
              max="10"
              step="1"
              onKeyPress={this.onKeyPress.bind(this)}
              onChange={this.onChange.bind(this)}
            />
            seconds on press
          </FormGroup>
        </form>
      </div>
    );
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  }

  onChange(event) {
    const { editId, data } = this.props;
    if (editId) {
      const update = {
        device: data.device,
        editId,
        prop: 'holdFor',
        value: event.target.value,
      };
      this.props.dispatch(updateControl(update));
    }
  }
}

export default HoldFor;