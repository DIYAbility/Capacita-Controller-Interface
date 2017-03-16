import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '105px', height: '105px' }}>
      <SvgXbox href={`stick-left-${props.view}`} x="-117" y="-430" />
    </div>
  );
};
