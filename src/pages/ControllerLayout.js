import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LayoutToolbar from '../components/layout/LayoutToolbar';
import Artboard from '../components/layout/Artboard';
import Playboard from '../components/play/Playboard';
import { createLayout } from '../actions/actions-layout';
import './ControllerLayout.css';

class ControllerLayout extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
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
    const { data, dispatch } = this.props;
    return (
      <LayoutToolbar
        data={data}
        dispatch={dispatch}
      />
    );
  }

  renderBoard() {
    const editMode = this.props.data.mode === 'edit';
    return (
      <div className="artboard-container">
        {editMode ? <Artboard {...this.props} /> : null}
        {!editMode ? <Playboard {...this.props} /> : null}
      </div>
    );
  }

  componentDidMount() {
    const { dispatch, route } = this.props;
    dispatch(createLayout(route[1]));
  }
}

const mapStateToProps = (state, props) => {
  return Object.assign({}, state.layout, { route: state.app.route });
}

export default connect(mapStateToProps)(ControllerLayout);
