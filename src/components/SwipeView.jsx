import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Card } from "@/components/Card";
import talents from "@/mock/data";
import PropTypes from 'prop-types';

const SwipeView = ({ cards, initialCard }) => {
  const [currentIndex, setCurrentIndex] = useState(
    cards.findIndex((c) => c.id === initialCard.id)
  );

  const handleSwipe = (direction) => {
    const newIndex =
      direction === "left"
        ? (currentIndex + 1) % cards.length
        : (currentIndex - 1 + cards.length) % cards.length;
    setCurrentIndex(newIndex);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handleSwipe("right");
      if (e.key === "ArrowRight") handleSwipe("left");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  if (cards.length === 0 || currentIndex >= cards.length) {
    return <div>Loading...</div>;
  }

  return (
    <div {...swipeHandlers} className="h-screen flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <Card
          card={cards[currentIndex]}
          index={currentIndex}
          hovered={null}
          setHovered={() => {}}
        />
      </div>
    </div>
  );
};

SwipeView.propTypes = {
  cards: PropTypes.array.isRequired,
  initialCard: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default SwipeView;