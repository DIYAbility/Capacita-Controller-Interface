import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '32px', height: '26px' }}>
      <SvgXbox href={`d-left-${props.view}`} x="-194" y="-553" />
    </div>
  );
};
