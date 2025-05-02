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

const GameArea: React.FC = () => {
  const [positionX, setPositionX] = useState(300);
  const [items, setItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);


  // Ağız kontrolü
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

  // Yeni nesneleri ekleme
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.floor(Math.random() * 670), // oyun alanı genişliği - item genişliği
          y: 0,
        },
      ]);
    }, 1000); // her saniyede bir item düşsün
    return () => clearInterval(interval);
  }, []);


// Çarpışma kontrolü
useEffect(() => {
  const checkCollisions = () => {
    items.forEach((item) => {
      const isHit =
        item.y + 30 >= 450 && // item yere yaklaşmış (ağız konumu)
        item.x < positionX + 100 &&
        item.x + 30 > positionX;

      if (isHit) {
        console.log('💥 Çarpışma! Item yakalandı:', item.id);
        setScore((prev) => prev + 1);
        setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));

        // Burada istersen puan artırabilir veya item'ı silebilirsin
      }
    });
  };

  const interval = setInterval(checkCollisions, 100);
  return () => clearInterval(interval);
}, [items, positionX]);


  // Mevcut nesneleri hareket ettirme
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 5 }))
          .filter((item) => item.y < 500) // alt sınırdan geçenleri temizle
      );
    }, 50,);
    return () => clearInterval(moveInterval);
  }, []);

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
      {items.map((item) => (
        <FallingItem key={item.id} x={item.x} y={item.y} />
      ))}
      <Mouth positionX={positionX} />
    </div>
  );
};

export default GameArea;
