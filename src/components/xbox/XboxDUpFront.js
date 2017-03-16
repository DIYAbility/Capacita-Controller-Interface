import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '34px', height: '12px' }}>
      <SvgXbox href={`d-up-front-${props.view}`} x="-210" y="-233" />
    </div>
  );
};
