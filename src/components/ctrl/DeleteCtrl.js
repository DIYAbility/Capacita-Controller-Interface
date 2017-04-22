import React, { Component, PropTypes } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { deleteControl } from '../../actions/actions-layout';

class DeleteCtrl extends Component {

  static propTypes = {
    editId: PropTypes.string,
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { confirming: false, editId: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editId !== this.state.editId) {
      this.setState({
        editId: nextProps.editId,
        confirming: false,
      });
    }
  }

  render() {
    const confirming = this.state.confirming;
    return (
      <div className="input-row">
        {confirming ? this.renderConfirm() : this.renderDelete()}
      </div>
    );
  }

  renderDelete() {
    return (
      <Button onClick={this.onTrashClick.bind(this)}>
        Delete
        <span className="glyphicon glyphicon-trash glyphicon-pullright" />
      </Button>
    );
  }

  renderConfirm() {
    return (
      <ButtonToolbar>
        <Button onClick={this.onCancelClick.bind(this)}>
          Cancel
        </Button>
        <Button onClick={this.onConfirmClick.bind(this)} bsStyle="danger">
          Yes, I'm sure
          <span className="glyphicon glyphicon-trash glyphicon-pullright" />
        </Button>
      </ButtonToolbar>
    );
  }

  onTrashClick() {
    this.setState({ confirming: true });
  }

  onCancelClick() {
    this.setState({ confirming: false });
  }

  onConfirmClick() {
    const { data, editId, dispatch } = this.props;
    dispatch(deleteControl(data.device, editId));
  }
}

export default DeleteCtrl;