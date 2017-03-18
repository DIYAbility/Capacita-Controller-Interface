import React, { Component, PropTypes } from 'react';
import { ControlLabel, Radio } from 'react-bootstrap';
import { changeDevice } from '../actions/actions-layout';

class LayoutSettingsDevice extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    device: PropTypes.string.isRequired,
  }

  render() {
    const { device } = this.props;
    return (
      <div className="input-row">
        <form>
          <ControlLabel>Console</ControlLabel>
          <div>
            <Radio inline name="controller-device" value="xbox"
              checked={device === 'xbox'}
              onChange={this.onChange.bind(this)}>
              XBox
            </Radio>
            {' '}
            <Radio inline name="controller-device" value="ps4"
              checked={device === 'ps4'}
              onChange={this.onChange.bind(this)}>
              PS4
            </Radio>
          </div>
        </form>
      </div>
    );
  }

  onChange(event) {
    this.props.dispatch(changeDevice(event.target.value));
  }
}

export default LayoutSettingsDevice;
