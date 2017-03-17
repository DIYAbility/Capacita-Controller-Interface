import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '148px', height: '70px' }}>
      <SvgXbox href={`bumper-right-${props.view}`} x="-354" y="-160" />
    </div>
  );
};
