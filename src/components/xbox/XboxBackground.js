import React from 'react';
import SvgXbox from './SvgXbox';

export default (props) => {
  const tmpStyle = {
    opacity: 0.25,
    position: 'absolute',
    top: '-66px',
    left: '-36px',
  };
  return (
    <div className="svg" style={{ width: '528px', height: '664px' }}>
      <SvgXbox href={`bg-${props.view}`} x="-37" y="-66" />
      <img src="tmp/SvgXbox.png" alt="" style={tmpStyle}/>

    </div>
  );
};
