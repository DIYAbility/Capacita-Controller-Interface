import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '26px', height: '32px' }}>
      <SvgXbox href={`d-down-${props.view}`} x="-220" y="-575" />
    </div>
  );
};
