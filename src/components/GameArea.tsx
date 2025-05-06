import React, { useEffect, useState } from 'react';
import Mouth from './Mouth';
import FallingItem from './FallingItem';

type ItemType =
  | 'apple' | 'kitty' | 'kitty2' | 'horse' | 'people' | 'chip'
  | 'flower1' | 'flower2' | 'flower3' | 'controller1' | 'controller2'
  | 'game' | 'camera' | 'photography'
  | 'needle' | 'needle2' | 'ghost1' | 'ghost2' | 'forbidden1'
  | 'forbidden2' | 'forbidden3' | 'robot' | 'robot2' | 'shark'
  | 'stain' | 'moon' | 'ice' | 'brush1' | 'brush2' | 'brush3'
  | 'key1' | 'key2' | 'minecraft' | 'block' | 'phone' | 'camera2';

type Effect = {
  score?: number;
  life?: number;
  slowDown?: boolean;
};

type Item = {
  id: number;
  x: number;
  y: number;
  type: ItemType;
};

const itemEffects: Record<ItemType, Effect> = {
  apple: { score: 1 },
  kitty: { score: 2 },
  kitty2: { score: 2 },
  horse: { score: 1 },
  people: { score: 1 },
  chip: { score: 2 },
  flower1: { score: 1 },
  flower2: { score: 1 },
  flower3: { score: 1 },
  controller1: { score: 3 },
  controller2: { score: 3 },
  game: { score: 2 },
  camera: { score: 2 },
  photography: { score: 2 },
  needle: { life: -1 },
  needle2: { life: -1 },
  ghost1: { life: -1 },
  ghost2: { life: -1 },
  forbidden1: { score: -1 },
  forbidden2: { score: -1 },
  forbidden3: { score: -1 },
  robot: { score: -1 },
  robot2: { score: -1 },
  shark: { score: -1 },
  stain: { score: -1 },
  moon: { slowDown: true },
  ice: { slowDown: true },
  brush1: { score: 1 },
  brush2: { score: 2 },
  brush3: { score: 3 },
  key1: { score: 5 },
  key2: { score: 5 },
  minecraft: { score: -1 },
  block: { score: -1 },
  phone: { score: 1 },
  camera2: { score: 1 },
};

const GameArea: React.FC = () => {
  const [positionX, setPositionX] = useState(300);
  const [items, setItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);
  const [itemSpeed, setItemSpeed] = useState(5); // ← düşüş hızı

  const randomType = (): ItemType => {
    const types: ItemType[] = Object.keys(itemEffects) as ItemType[];
    const index = Math.floor(Math.random() * types.length);
    return types[index];
  };

  // Klavye ile ağız hareketi
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPositionX((prev) => {
        if (e.key === 'ArrowLeft') return Math.max(prev - 20, 0);
        if (e.key === 'ArrowRight') return Math.min(prev + 20, 600);
        return prev;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Yeni item oluşturma
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.floor(Math.random() * 670),
          y: 0,
          type: randomType(),
        },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Çarpışma kontrolü + efekt uygulama
  useEffect(() => {
    const checkCollisions = () => {
      items.forEach((item) => {
        const isHit =
          item.y + 30 >= 450 &&
          item.x < positionX + 100 &&
          item.x + 30 > positionX;

        if (isHit) {
          const effect = itemEffects[item.type];

          if (effect?.score !== undefined) {
            // console.log('💰 Puan arttı!');
            setScore((prev) => prev + effect.score);
          }
          if (effect?.life !== undefined) {
            // console.log('❤️ Can arttı!');
            setLife((prev) => Math.max(0, prev + effect.life));
          }
          if (effect?.slowDown) {
            console.log('🌀 Yavaşlatıcı etki aktif!');
            setItemSpeed(2); // yavaşlat

            setTimeout(() => {
              setItemSpeed(5); // normale dön
              console.log('⏩ Hız normale döndü');
            }, 3000);
          }

          setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
        }
      });
    };

    const interval = setInterval(checkCollisions, 100);
    return () => clearInterval(interval);
  }, [items, positionX]);

  // Düşen item’ları hareket ettirme
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + itemSpeed }))
          .filter((item) => item.y < 500)
      );
    }, 50);
    return () => clearInterval(moveInterval);
  }, [itemSpeed]);

  return (
    <div
      style={{
        position: 'relative',
        width: 700,
        height: 500,
        backgroundColor: '#f0f0f0',
        margin: '0 auto',
        overflow: 'hidden',
        border: '2px solid #444',
      }}
    >
      <p style={{ position: 'absolute', top: 10, left: 10, fontWeight: 'bold' }}>
        Skor: {score} | Can: {life}
      </p>
      {items.map((item) => (
        <FallingItem key={item.id} x={item.x} y={item.y} type={item.type} />
      ))}
      <Mouth positionX={positionX} />
    </div>
  );
};

export default GameArea;
