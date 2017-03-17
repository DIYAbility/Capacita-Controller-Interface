import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '43px', height: '16px' }}>
      <SvgXbox href={`Y-front-${props.view}`} x="-419" y="-232" />
    </div>
  );
};
