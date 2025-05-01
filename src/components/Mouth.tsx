import React from 'react';

type MouthProps = {
  positionX: number;
};

const Mouth: React.FC<MouthProps> = ({ positionX }) => {
  return (
    <img
      src="/mouth.png"
      alt="mouth"
      style={{
        position: 'absolute',
        bottom: 20,
        left: positionX,
        width: 100,
        height: 'auto',
        // transform: 'translateX(-50%)',
      }}
    />
  );
};

export default Mouth;
