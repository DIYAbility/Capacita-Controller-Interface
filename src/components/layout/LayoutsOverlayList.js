import React, { Component, PropTypes } from 'react';

class LayoutsOverlayList extends Component {

  static propTypes = {
    layouts: PropTypes.object.isRequired,
  }

  render() {
    const layouts = this.props.layouts;
    const items = Object.keys(layouts).map((key, index) => {
      const item = layouts[key];
      return (
        <li key={index}>
          <small className="device">{item.device}</small>
          <a href={`#layout/${key}`}>
            {item.name}
          </a>
          <hr />
        </li>
      );
    });
    return (
      <ul className="overlay-items-list">
        {items}
      </ul>
    );
  }
}

export default LayoutsOverlayList;
