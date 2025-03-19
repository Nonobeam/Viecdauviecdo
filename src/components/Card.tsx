"use client";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

type TalentCard = {
  id: string;
  name: string;
  location: string;
  role: string;
  avatar: string;
  fallback: string;
  skills: { id: string; name: string; color: string }[];
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
  }: {
    card: TalentCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick: () => void;
  }) => {
    const cardRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (hovered === index && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        const rotateY = deltaX * 10;
        const rotateX = -deltaY * 10;
        cardRef.current.style.setProperty("--r-y", `${rotateY}deg`);
        cardRef.current.style.setProperty("--r-x", `${rotateX}deg`);
      }
    };

    const handleMouseLeave = () => {
      setHovered(null);
      if (cardRef.current) {
        cardRef.current.style.setProperty("--r-y", "0deg");
        cardRef.current.style.setProperty("--r-x", "0deg");
      }
    };

    return (
      <div className="w-full h-full" style={{ perspective: "600px" }}>
        <button
          onClick={onClick}
          ref={cardRef}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onFocus={() => setHovered(index)}
          onBlur={() => setHovered(null)}
          className={cn(
            "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
            hovered !== null && hovered !== index && "blur-sm",
            hovered === index && "z-10 shadow-xl cursor-pointer"
          )}
          style={{
            "--r-x": "0deg",
            "--r-y": "0deg",
            transform: (() => {
              if (hovered === index) {
            return "scale(1.05) rotateY(var(--r-y)) rotateX(var(--r-x))";
              } else if (hovered !== null) {
            return "scale(0.98)";
              } else {
            return "scale(1)";
              }
            })(),
          } as React.CSSProperties}
          tabIndex={0}
        >
          <Avatar className="absolute inset-0 w-full h-full">
            <AvatarImage src={card.avatar} className="object-cover w-full h-full" />
            <AvatarFallback>{card.fallback}</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white transition-opacity duration-300",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          >
            <h2 className="text-2xl font-bold mb-2">{card.name}</h2>
            <p className="text-lg mb-1">{card.location}</p>
            <p className="text-lg mb-4">{card.role}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {card.skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className={`px-2 py-1 rounded ${skill.color}`}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </button>
      </div>
    );
  }
);

Card.displayName = "Card";