import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import React from "react";

export default function TabList({ tabs, activeTab, setActiveTab, labels = {} }) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors border-b-2",
              activeTab === tab
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {labels[tab] || tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

TabList.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string),
};
