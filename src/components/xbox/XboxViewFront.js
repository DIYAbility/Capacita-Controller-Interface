import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '28px', height: '12px' }}>
      <SvgXbox href={`view-front-${props.view}`} x="-246" y="-233" />
    </div>
  );
};
