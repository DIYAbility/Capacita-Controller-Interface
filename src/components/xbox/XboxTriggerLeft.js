import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '85px', height: '100px' }}>
      <SvgXbox href={`trigger-left-${props.view}`} x="-95" y="-80" />
    </div>
  );
};
