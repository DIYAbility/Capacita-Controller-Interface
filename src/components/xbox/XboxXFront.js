import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '46px', height: '15px' }}>
      <SvgXbox href={`X-front-${props.view}`} x="-378" y="-234" />
    </div>
  );
};
