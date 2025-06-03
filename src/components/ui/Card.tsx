import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

type UserInformation = {
  // If your backend eventually returns these, keep them here.
  location?: string;
  job_title?: string;
  full_name: string;
  city?: string;
  state?: string;
  country?: string;
  skills?: string[];
  certifications?: string[];
};

  type Talent  = {
    email: string;
    image: string;
    fallback: string;
    user_information?: UserInformation;
  };

export const Card = React.memo(
  
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
  }: {
    card: Talent;
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
            "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-full w-full transition-all duration-300 ease-out",
            hovered !== null && hovered !== index && "blur-sm",
            hovered === index && "z-10 shadow-xl cursor-pointer"
          )}
          style={
            {
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
            } as React.CSSProperties
          }
          tabIndex={0}
        >
          <Avatar className="absolute inset-0 w-full h-full">
            <AvatarImage
              src={card.image || "https://www.shutterstock.com/image-vector/default-gray-man-avatar-template-260nw-662278102.jpg"}
              className="object-cover w-full h-full"
            />
            <AvatarFallback>{card.fallback}</AvatarFallback>
          </Avatar>
          {/* Skills Box */}
          <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-black/50 flex flex-wrap justify-center gap-2 p-2 overflow-hidden">
            {card.user_information.skills?.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-2 h-10 text-xs rounded bg-gray-700 text-white"
              >
                {skill}
              </Badge>
            ))}
          </div>
          {/* Hover Overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white transition-opacity duration-300",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          >
            <h2 className="text-2xl font-bold mb-2">{card.user_information.full_name}</h2>
            <p className="text-lg mb-1">{card.user_information.location}</p>
            <p className="text-lg mb-4">{card.user_information.job_title}</p>
          </div>
        </button>
      </div>
    );
  }
);

Card.displayName = "Card";
