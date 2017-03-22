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
  // <SvgPS4 href={`bg-${props.view}`} x="-37" y="-66" />
  return (
    <div className="svg" style={{ width: '528px', height: '664px' }}>
      <img src={`/img/ps4/bg-${props.view}.png`} alt="" />
    </div>
  );
};
