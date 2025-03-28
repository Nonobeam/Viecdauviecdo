import { TalentCard } from "@/components/items/TalentCard";
import talents from "@/mock/data";

const Talent = () => {
  return (
    <div className="h-full overflow-auto p-4">
      <TalentCard cards={talents} />
    </div>
  );
};

export default Talent;