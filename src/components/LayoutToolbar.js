import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem, Grid, Overlay } from 'react-bootstrap';
import LayoutSettingsDevice from './LayoutSettingsDevice';
import LayoutSettingsView from './LayoutSettingsView';
import OverlayContainer from './OverlayContainer';

class LayoutToolbar extends Component {

  static propTypes = {
    layout: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { settings: false };
  }

  render() {
    const { layout } = this.props;
    return layout ? (
      <div>
        {this.renderNavbar()}
        {this.renderLayoutSettings()}
      </div>
    ) : null;
  }

  renderNavbar() {
    return (
      <Navbar>
        <Grid>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav activeKey={0} bsStyle="pills" pullRight>
              <NavItem eventKey={1} onClick={this.onSettingsOn.bind(this)} ref="settings">
                <span className="glyphicon glyphicon-cog" />
                Settings
              </NavItem>
              <NavItem eventKey={2} onClick={this.onEditMode.bind(this)}>
                <span className="glyphicon glyphicon-edit" />
                Disable edit mode
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Grid>
      </Navbar>
    );
  }

  renderLayoutSettings() {
    const { layout, dispatch } = this.props;
    return (
      <Overlay
        show={this.state.settings}
        onHide={this.onSettingsOff.bind(this)}
        container={this}
        placement="bottom"
        rootClose={true}
        target={() => ReactDOM.findDOMNode(this.refs.settings)}
        ref="overlaySettings">
        <OverlayContainer>
          <LayoutSettingsDevice device={layout.device} dispatch={dispatch} />
          <LayoutSettingsView view={layout.view} dispatch={dispatch} />
        </OverlayContainer>
      </Overlay>
    );
  }

  onSettingsOn() {
    if (this.state.settings) {
      this.onSettingsOff();
    } else {
      requestAnimationFrame(() => {
        this.positionSettingsOverlay();
        window.addEventListener('resize', this.positionSettingsOverlay.bind(this));
      });
      this.setState({ settings: true });
    }
  }

  onSettingsOff() {
    this.setState({ settings: false });
    window.removeEventListener('resize', this.positionSettingsOverlay.bind(this));
  }

  onEditMode() {
    //
  }

  // React-bootstrap bug? Setting `target` should do this, n'est pas?
  positionSettingsOverlay() {
    const thisEl = ReactDOM.findDOMNode(this);
    const trigger = ReactDOM.findDOMNode(this.refs.settings);
    const overlay = thisEl.querySelector('.overlay-container');
    const containerRect = thisEl.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    overlay.style.left = (triggerRect.left - containerRect.left) + 'px';
    overlay.style.top = triggerRect.bottom + 'px';
    // (triggerRect.bottom - containerRect.top) + 'px';
  }
}

export default LayoutToolbar;
