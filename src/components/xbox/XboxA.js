import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '46px', height: '46px' }}>
      <SvgXbox href={`A-${props.view}`} x="-412" y="-494" />
    </div>
  );
};
