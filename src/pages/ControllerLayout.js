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
    const { dispatch } = this.props;
    console.log('props',this.props)
    if (this.props.app.route.length == 2) {
      alert(this.props.app.route[1]);
    }
    dispatch(createLayout());
  }
}

const mapStateToProps = (state, props) => {
  return state.layout
}

export default connect(mapStateToProps)(ControllerLayout);
