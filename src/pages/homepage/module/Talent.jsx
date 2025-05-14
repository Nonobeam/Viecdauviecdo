import { TalentCard } from "@/components/items/TalentCard";
import ChatbotButton from "@/components/ui/chatbotButton";
import talents from "@/mock/data";

const Talent = () => {
  return (
    <div className="h-full overflow-auto p-4">
      <TalentCard cards={talents} />
      <ChatbotButton/>
    </div>
  );
};

export default Talent;