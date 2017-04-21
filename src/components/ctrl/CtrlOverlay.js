import React, { Component, PropTypes } from 'react';
import OverlayContainer from '../OverlayContainer';
import KeyboardShortcut from './KeyboardShortcut';

class CtrlOverlay extends Component {

  static propTypes = {
    editId: PropTypes.string,
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    pointer: PropTypes.string,
  }

  render() {
    const { pointer } = this.props;
    return (
      <OverlayContainer overlay="item-edit" pointer={pointer || 'left'}>
        <KeyboardShortcut {...this.props} />
      </OverlayContainer>
    );
  }
}

export default CtrlOverlay;