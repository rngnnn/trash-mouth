import React from 'react';

type ItemType =
  | 'apple' | 'kitty' | 'kitty2' | 'horse' | 'people' | 'chip'
  | 'flower1' | 'flower2' | 'flower3' | 'controller1' | 'controller2'
  | 'game' | 'camera' | 'photography'
  | 'needle' | 'needle2' | 'ghost1' | 'ghost2' | 'forbidden1'
  | 'forbidden2' | 'forbidden3' | 'robot' | 'robot2' | 'shark'
  | 'stain' | 'moon' | 'ice' | 'brush1' | 'brush2' | 'brush3'
  | 'key1' | 'key2' | 'minecraft' | 'block' | 'phone' | 'camera2';

type FallingItemProps = {
  x: number;
  y: number;
  type: ItemType;
};

const FallingItem: React.FC<FallingItemProps> = ({ x, y, type }) => {
  const imageSrc = `/images/${type}.png`;

  return (
    <img
      src={imageSrc}
      alt={type}
      style={{
        color: 'red ',
        position: 'absolute',
        top: y,
        left: x,
        width: 40,
        height: 40,
        objectFit: 'contain',
      }}
    />
  );
};

export default FallingItem;
