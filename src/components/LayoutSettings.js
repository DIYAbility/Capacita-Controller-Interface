import React, { Component, PropTypes } from 'react';
import LayoutSettingsDevice from './LayoutSettingsDevice';
import LayoutSettingsView from './LayoutSettingsView';

class LayoutSettings extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    layout: PropTypes.object.isRequired
  }

  render() {
    const { layout, dispatch } = this.props;
    return (
      <div>
        <LayoutSettingsDevice device={layout.device} dispatch={dispatch} />
        <LayoutSettingsView view={layout.view} dispatch={dispatch} />
      </div>
    );
  }

}

export default LayoutSettings;
