import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '46px', height: '46px' }}>
      <SvgXbox href={`B-${props.view}`} x="-448" y="-458" />
    </div>
  );
};
