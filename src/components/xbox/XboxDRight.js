import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '32px', height: '26px' }}>
      <SvgXbox href={`d-right-${props.view}`} x="-240" y="-553" />
    </div>
  );
};
