import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import { Overlay } from 'react-bootstrap';
import HTML5Backend from 'react-dnd-html5-backend';
import LayoutTarget from '../components/LayoutTarget';
import DeviceSource from '../components/DeviceSource';
import ControlDragLayer from '../components/ControlDragLayer';
import OverlayContainer from './OverlayContainer';
import './Artboard.css';

class Artboard extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { editId: null, editEl: null };
  }

  render() {
    const { view, device } = this.props.data;
    const className = `artboard-content edit-mode ${view} ${device}`;
    return (
      <div className={className}>
        <LayoutTarget {...this.props}
          onItemEdit={this.onItemEdit.bind(this)}
          editItem={this.state.editId}
        />
        <DeviceSource {...this.props} />
        <ControlDragLayer />
        {this.renderItemEditOverlay()}
      </div>
    );
  }

  renderItemEditOverlay() {
    return (
      <Overlay
        show={!!this.state.editId}
        onHide={this.onItemEditOff.bind(this)}
        container={this}
        placement="bottom"
        rootClose={true}
        target={() => this.state.editEl}>
        <OverlayContainer overlay="item-edit">
          <p>Ok</p>
        </OverlayContainer>
      </Overlay>
    );
  }

  onItemEditOff() {
    this.setState({ editId: null });
    window.removeEventListener('resize', this.positionItemEditOverlay.bind(this));
  }

  onItemEdit(item) {
    if (this.state.editId === item.id) {
      this.onItemEditOff(item.id);
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.positionItemEditOverlay();
          window.addEventListener('resize', this.positionItemEditOverlay.bind(this));
        });
        this.setState({ editId: item.id, editEl: item.target });
      });
    }
  }

  positionItemEditOverlay() {
    const thisEl = ReactDOM.findDOMNode(this);
    const trigger = this.state.editEl;
    const overlay = thisEl.querySelector('.overlay-container.item-edit');
    const containerRect = thisEl.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    overlay.style.left = (triggerRect.left + 48 - containerRect.left) + 'px';
    overlay.style.top = (triggerRect.bottom - 48 - containerRect.top) + 'px';
    overlay.style.visibility = 'visible';
  }
}

export default DragDropContext(HTML5Backend)(Artboard);
