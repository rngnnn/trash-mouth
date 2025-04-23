import React from 'react';

type MouthProps = {
  positionX: number;
};

const Mouth: React.FC<MouthProps> = ({ positionX }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: positionX,
        width: 100,
        height: 50,
        backgroundColor: 'tomato',
        borderRadius: '0 0 50px 50px',
        transition: 'left 0.05s linear',
      }}
    />
  );
};

export default Mouth;
