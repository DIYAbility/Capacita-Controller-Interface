import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '124px', height: '52px' }}>
      <SvgXbox href={`bumper-right-top-${props.view}`} x="-366" y="-371" />
    </div>
  );
};
