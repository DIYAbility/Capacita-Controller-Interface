import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '30px', height: '30px' }}>
      <SvgXbox href={`view-${props.view}`} x="-249" y="-465" />
    </div>
  );
};
