import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Filter, Users } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface UserInformation {
  full_name: string;
  job_title?: string;
  location?: string;
  city?: string;
  state?: string;
  country?: string;
  skills?: string[];
  certifications?: string[];
}

interface TalentCardProps {
  user_id: string
  email: string
  image: string
  fallback: string
  user_information?: UserInformation
}

interface TalentCardComponentProps {
  cards: TalentCardProps[];
  onCardClick?: (card: TalentCardProps) => void;
}

const TalentCard: React.FC<TalentCardComponentProps> = ({ cards, onCardClick }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleCardClick = (card: TalentCardProps) => {
    onCardClick?.(card)
    navigate(`/profile/${card.user_id}`)
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg p-8 border border-indigo-100">
        <Users className="w-16 h-16 text-indigo-300 mb-4" />
        <p className="text-lg text-gray-600 mb-4">Chưa có thành viên nào</p>
        <p className="text-sm text-gray-500 text-center max-w-md">
          Hãy thử điều chỉnh bộ lọc tìm kiếm hoặc quay lại sau để khám phá thêm
          nhiều thành viên hơn.
        </p>
        <Button
          variant="outline"
          className="mt-4 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Điều chỉnh bộ lọc
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
          Thành viên của Matchlent
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={`${card.user_id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-96"
          >
            <Card
              card={card}
              index={index}
              hovered={hoveredCard}
              setHovered={setHoveredCard}
              onClick={() => handleCardClick(card)}
            />
          </motion.div>
        ))}
      </motion.div>

      {cards.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            Hiển thị {cards.length} chuyên gia đầu tiên
          </p>
          <Button
            variant="outline"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-8"
          >
            Xem thêm chuyên gia
          </Button>
        </div>
      )}
    </div>
  );
};

export { TalentCard }
export type { TalentCardComponentProps, TalentCardProps }

