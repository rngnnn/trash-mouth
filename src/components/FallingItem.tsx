import React from 'react';

type FallingItemProps = {
  x: number;
  y: number;
};

const FallingItem: React.FC<FallingItemProps> = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: 30,
        height: 30,
        backgroundColor: 'blue',
        borderRadius: '5px',
      }}
    />
  );
};

export default FallingItem;
