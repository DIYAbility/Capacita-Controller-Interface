import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem, Grid, Overlay } from 'react-bootstrap';
import OverlayContainer from './OverlayContainer';
// import * as actions from '../actions/actions-app';
import './AppToolbar.css';

class AppToolbar extends Component {

  constructor(props) {
    super(props);
    this.state = { layouts: false };
  }

  render() {
    return (
      <Navbar inverse fixedTop className="app-toolbar">
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Capacita</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav activeKey={1} className="navbar-nostyle ">
              {this.renderLayoutsNavItem()}
              <NavItem eventKey={0} href="/#layout" >
                <span className="glyphicon glyphicon-plus" />
                New layout
              </NavItem>
            </Nav>
            <Nav pullRight className="navbar-nostyle">
              <NavItem eventKey={1} href="/#help">Help</NavItem>
              {this.renderAccount()}
            </Nav>
          </Navbar.Collapse>
        </Grid>
        {this.renderLayoutsOverlay()}
      </Navbar>
    );
  }

  renderAccount() {
    const user = this.props.app.user;
    const href = user ? '/#account' : '/#signin';
    const label = user ? `${user.name}` : 'Sign in';
    return (
      <NavItem eventKey={2} href={href} className="border-left">
        {label}
      </NavItem>
    );
  }

  renderLayoutsNavItem() {
    const user = this.props.app.user;
    if (user && Object.keys(user.layouts).length) {
      return (
        <NavItem eventKey={0} onClick={this.onLayoutsOn.bind(this)} ref="layouts">
          Layouts
          <span className="glyphicon glyphicon-triangle-bottom glyphicon-pullright" />
        </NavItem>
      );
    }
    return null;
  }

  renderLayoutsOverlay() {
    // const { data, dispatch } = this.props;
    return (
      <Overlay
        show={this.state.layouts}
        onHide={this.onLayoutsOff.bind(this)}
        container={this}
        rootClose={true}
        target={() => ReactDOM.findDOMNode(this.refs.layouts)}
        ref="overlayLayouts">
        <OverlayContainer overlay="layouts">
          <p>Hello</p>
        </OverlayContainer>
      </Overlay>
    );
  }

  onLayoutsOn() {
    if (this.state.layouts) {
      this.onLayoutsOff();
    } else {
      requestAnimationFrame(() => {
        this.positionLayoutsOverlay();
        window.addEventListener('resize', this.positionLayoutsOverlay.bind(this));
      });
      this.setState({ layouts: true });
    }
  }

  onLayoutsOff() {
    this.setState({ layouts: false });
    window.removeEventListener('resize', this.positionLayoutsOverlay.bind(this));
  }

  positionLayoutsOverlay() {
    const thisEl = ReactDOM.findDOMNode(this);
    const trigger = ReactDOM.findDOMNode(this.refs.layouts);
    const overlay = thisEl.querySelector('.overlay-container');
    const containerRect = thisEl.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    overlay.style.left = (triggerRect.left + containerRect.left) + 'px';
    overlay.style.top = triggerRect.bottom + 'px';
  }
}

export default AppToolbar;
