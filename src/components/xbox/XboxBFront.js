import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '43px', height: '18px' }}>
      <SvgXbox href={`B-front-${props.view}`} x="-457" y="-224" />
    </div>
  );
};
