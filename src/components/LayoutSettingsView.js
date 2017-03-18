import React, { Component, PropTypes } from 'react';
import { ControlLabel, Radio } from 'react-bootstrap';
import { changeView } from '../actions/actions-layout';

class LayoutSettingsView extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
  }

  render() {
    const { view } = this.props;
    return (
      <div className="input-row">
        <form>
          <ControlLabel>Controller view</ControlLabel>
          <div>
            <Radio inline name="controller-view" value="simple"
              checked={view === 'simple'}
              onChange={this.onChange.bind(this)}>
              Simple
            </Radio>
            {' '}
            <Radio inline name="controller-view" value="wireframe"
              checked={view === 'wireframe'}
              onChange={this.onChange.bind(this)}>
              Wireframe
            </Radio>
            {' '}
            <Radio inline name="controller-view" value="detailed"
              checked={view === 'detailed'}
              onChange={this.onChange.bind(this)}>
              Detailed
            </Radio>
          </div>
        </form>
      </div>
    );
  }

  onChange(event) {
    this.props.dispatch(changeView(event.target.value));
  }
}

export default LayoutSettingsView;
