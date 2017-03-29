import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LayoutToolbar from '../components/LayoutToolbar';
import Artboard from '../components/Artboard';
import Playboard from '../components/Playboard';
import { createLayout } from '../actions/actions-app';
import './ControllerLayout.css';

class ControllerLayout extends Component {

  static propTypes = {
    layout: PropTypes.object,
    editMode: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="controller-layout">
        {this.renderLayoutToolbar()}
        {this.renderBoard()}
      </div>
    );
  }

  renderLayoutToolbar() {
    const { layout, dispatch, editMode } = this.props;
    return (
      <LayoutToolbar
        layout={layout}
        editMode={editMode}
        dispatch={dispatch}
      />
    );
  }

  renderBoard() {
    const { layout, editMode } = this.props;
    return layout ? (
      <div className="artboard-container">
        {editMode ? <Artboard {...this.props} /> : null}
        {!editMode ? <Playboard {...this.props} /> : null}
      </div>
    ) : null;
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
    layout: (app.activeLayoutIndex < 0) ? null : app.layouts[app.activeLayoutIndex],
    editMode: app.editMode,
  };
}

export default connect(mapStateToProps)(ControllerLayout);
