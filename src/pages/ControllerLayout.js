import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LayoutToolbar from '../components/LayoutToolbar';
import Artboard from '../components/Artboard';
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
        {this.renderArtboard()}
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

  renderArtboard() {
    const { layout } = this.props;
    return layout ? (
      <div className="artboard-container">
        <Artboard {...this.props} />
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
