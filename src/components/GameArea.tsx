import React, { useEffect, useState } from 'react';
import Mouth from './Mouth';
import FallingItem from './FallingItem';

type Item = {
  id: number;
  x: number;
  y: number;
};

const GameArea: React.FC = () => {
  const [positionX, setPositionX] = useState(300);
  const [items, setItems] = useState<Item[]>([]);

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

  // Mevcut nesneleri hareket ettirme
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 5 }))
          .filter((item) => item.y < 500) // alt sınırdan geçenleri temizle
      );
    }, 50);
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
