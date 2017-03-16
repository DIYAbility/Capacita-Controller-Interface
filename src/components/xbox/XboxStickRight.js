import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '105px', height: '105px' }}>
      <SvgXbox href={`stick-right-${props.view}`} x="-316" y="-508" />
    </div>
  );
};
