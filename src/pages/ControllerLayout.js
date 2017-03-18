import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Grid, Overlay } from 'react-bootstrap';
import Artboard from '../components/Artboard';
import OverlayContainer from '../components/OverlayContainer';
import LayoutSettings from '../components/LayoutSettings';
import { createLayout } from '../actions/actions-app';
import './ControllerLayout.css';

class ControllerLayout extends Component {

  constructor(props) {
    super(props);
    this.state = { settings: false };
  }

  render() {
    return (
      <div className="controller-layout">
        <Navbar>
          {this.renderNavbar()}
        </Navbar>

        {this.renderArtboard()}

        {this.renderSettingsOverlay()}
      </div>
    );
  }

  renderNavbar() {
    return this.props.layout ? (
      <Grid>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav activeKey={0} bsStyle="pills">
            <NavItem eventKey={1} onClick={this.onSettings.bind(this)} ref="settings">
              <span className="glyphicon glyphicon-cog" />
              Settings
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Grid>
    ) : null;
  }

  renderArtboard() {
    const { layout } = this.props;
    return layout ? (
      <div className="artboard-container">
        <Artboard {...this.props} />
      </div>
    ) : null;
  }

  renderSettingsOverlay() {
    return (
      <Overlay
        show={this.state.settings}
        onHide={() => this.setState({ settings: false })}
        container={this}
        placement="bottom"
        rootClose={true}
        target={() => ReactDOM.findDOMNode(this.refs.settings)}>
        <OverlayContainer>
          <LayoutSettings {...this.props}/>
        </OverlayContainer>
      </Overlay>
    );
  }

  onSettings() {
    this.setState({ settings: !this.state.settings });
  }

  componentDidMount() {
    const { layout, dispatch } = this.props;
    if (!layout) {
      dispatch(createLayout());
    }
  }
}

const mapStateToProps = (state, props) => {
  const { app } = state;
  return {
    layout: (app.activeLayoutIndex < 0) ? null : app.layouts[app.activeLayoutIndex]
  };
}

export default connect(mapStateToProps)(ControllerLayout);
