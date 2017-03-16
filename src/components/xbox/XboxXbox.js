import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '53px', height: '53px' }}>
      <SvgXbox href={`xbox-${props.view}`} x="-274" y="-396" />
    </div>
  );
};
