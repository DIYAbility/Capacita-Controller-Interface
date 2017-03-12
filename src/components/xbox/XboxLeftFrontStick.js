import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '62px', height: '40px' }}>
      <SvgXbox href={`stick-left-front-${props.view}`} x="-126" y="-238" />
    </div>
  );
};
