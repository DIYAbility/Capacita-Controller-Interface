import React from 'react';
import SvgPS4 from './SvgPS4';

export default (props) => {
  // const tmpStyle = {
  //   opacity: 0.25,
  //   position: 'absolute',
  //   top: '-66px',
  //   left: '-36px',
  // };
  // <img src="tmp/SvgXbox.png" alt="" style={tmpStyle}/>
  return (
    <div className="svg" style={{ width: '528px', height: '664px' }}>
      <SvgPS4 href={`bg-${props.view}`} x="-37" y="-66" />
    </div>
  );
};
