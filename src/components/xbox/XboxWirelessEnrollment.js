import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '47px', height: '30px' }}>
      <SvgXbox href={`wireless-enrollment-${props.view}`} x="-237" y="-193" />
    </div>
  );
};
