import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  return (
    <div className="svg" style={{ width: '64px', height: '40px' }}>
      <SvgXbox href={`stick-right-front-${props.view}`} x="-335" y="-245" />
    </div>
  );
};
