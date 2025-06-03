"use client";
import { Card } from "@/components/ui/Card";
import React, { useState } from "react";

export function TalentCard({ cards, onCardClick }) {
  const [hovered, setHovered] = useState<number | null>(null);
  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Chưa có tài năng nào</p>
      </div>
    );
  }
  
  const log = (msg: any) => {
  return null;
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        
        <div key={card.id || index} className="h-96">
          <Card
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            onClick={() => onCardClick(card)}
          />
        </div>
      ))}
    </div>
  );
};