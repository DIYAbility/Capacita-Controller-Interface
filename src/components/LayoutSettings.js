import React, { Component, PropTypes } from 'react';
import { ControlLabel, Radio } from 'react-bootstrap';
import { changeView } from '../actions/actions-layout';

class LayoutSettings extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    layout: PropTypes.object
  }

  render() {
    const { layout } = this.props;
    return (
      <div>
        <div className="input-row">
          <form>
            <ControlLabel>Controller view</ControlLabel>
            <div>
              <Radio inline name="controller-view" value="simple"
                checked={layout.view === 'simple'}
                onChange={this.onViewChange.bind(this)}>
                Simple
              </Radio>
              {' '}
              <Radio inline name="controller-view" value="wireframe"
                checked={layout.view === 'wireframe'}
                onChange={this.onViewChange.bind(this)}>
                Wireframe
              </Radio>
              {' '}
              <Radio inline name="controller-view" value="detailed"
                checked={layout.view === 'detailed'}
                onChange={this.onViewChange.bind(this)}>
                Detailed
              </Radio>
            </div>
          </form>
        </div>
      </div>
    );
  }

  onViewChange(event) {
    this.props.dispatch(changeView(event.target.value));
  }
}

export default LayoutSettings;
