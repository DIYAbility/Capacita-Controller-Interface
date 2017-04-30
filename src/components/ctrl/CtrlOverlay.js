import React, { Component, PropTypes } from 'react';
import OverlayContainer from '../app/OverlayContainer';
import KeyboardShortcut from './KeyboardShortcut';
import HoldFor from './HoldFor';
import RepeatFor from './RepeatFor';
import DeleteCtrl from './DeleteCtrl';
import './CtrlOverlay.css';

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
        <HoldFor {...this.props} />
        <RepeatFor {...this.props} />
        <DeleteCtrl {...this.props} />
      </OverlayContainer>
    );
  }
}

export default CtrlOverlay;