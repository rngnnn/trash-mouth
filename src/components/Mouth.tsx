import React from 'react';

type MouthProps = {
  positionX: number;
};

const Mouth: React.FC<MouthProps> = ({ positionX }) => {
  return (
    <img
    src="/images/mouth-art.png"
    alt="mouth"
    style={{
      position: 'absolute',
      bottom: 20,
      left: positionX,
      width: 220,
      height: 'auto',
    }}
  />
  
  );
};

export default Mouth;
