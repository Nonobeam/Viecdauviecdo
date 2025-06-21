import { useEffect, useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { Card } from "@/components/Card";
import { useMotionValue, useTransform, useAnimation } from "framer-motion";
import PropTypes from "prop-types";
import { Frame } from "./ui/Frame";

const SwipeView = ({ cards, initialCard }) => {
  const position = useMotionValue(0);
  const rotate = useTransform(position, [-200, 200], [-50, 50]);
  const opacity = useTransform(
    position,
    [-200, -100, 0, 100, 200],
    [0, 1, 1, 1, 0]
  );
  const anim = useAnimation();

  const [currentIndex, setCurrentIndex] = useState(
    cards.findIndex((c) => c.id === initialCard.id)
  );

  const previousIndex = (currentIndex - 1 + cards.length) % cards.length;
  const nextIndex = (currentIndex + 1) % cards.length;

  const handleSwipe = useCallback(
    (direction) => {
      const newIndex =
        direction === "left"
          ? (currentIndex + 1) % cards.length
          : (currentIndex - 1 + cards.length) % cards.length;
      setCurrentIndex(newIndex);
    },
    [currentIndex, cards.length]
  );

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
  }, [handleSwipe]);

  if (cards.length === 0 || currentIndex >= cards.length) {
    return <div>Loading...</div>;
  }

  return (
    <div {...swipeHandlers} className="h-fit flex items-center justify-center">
      <div className="relative w-2/3 flex justify-center items-center overflow-hidden">
        <button
          onClick={() => handleSwipe("right")}
          className="absolute left-4 z-20 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="previous flex-none w-2/3 opacity-50 scale-90 h-80 md:h-112">
          <Card
            card={cards[previousIndex]}
            index={previousIndex}
            hovered={null}
            setHovered={() => {}}
          />
        </div>
        <Frame
          center
          drag="x"
          height={300}
          dragConstraints={{ left: -200, right: 200 }}
          x={position}
          animate={anim}
          rotate={rotate}
          opacity={opacity}
          onDragEnd={function (_, info) {
            if (Math.abs(info.point.x) < 100) {
              anim.start({ x: 0 });
            } else {
              anim.start({ x: info.point.x < 0 ? -200 : 200 });
            }
          }}
        >
          <div className="current flex-none w-2/3 z-10 h-96 md:h-160">
            <Card
              card={cards[currentIndex]}
              index={currentIndex}
              hovered={null}
              setHovered={() => {}}
            />
          </div>
        </Frame>
        <div className="next flex-none w-2/3 opacity-50 scale-90 h-80 md:h-112">
          <Card
            card={cards[nextIndex]}
            index={nextIndex}
            hovered={null}
            setHovered={() => {}}
          />
        </div>

        <button
          onClick={() => handleSwipe("left")}
          className="absolute right-4 z-20 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
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
