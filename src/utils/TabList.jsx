import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const TabList = ({ tabs, activeTab, setActiveTab, labels }) => {
    return (
        <Tabs defaultValue={tabs[0]} className="w-full" onValueChange={setActiveTab}>
            <TabsList className={`grid w-full grid-cols-${tabs.length} h-12 text-md relative`}>
                {tabs.map((tab) => (
                    <TabsTrigger 
                        key={tab} 
                        value={tab} 
                        className="relative text-md bg-transparent data-[state=active]:bg-transparent"
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="underline"
                                className="absolute bottom-0 left-5 w-90 h-1 bg-indigo-600"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                        {labels?.[tab] || tab}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};

TabList.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    labels: PropTypes.objectOf(PropTypes.string),
};

export default TabList;