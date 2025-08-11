import React, { cloneElement } from "react";

const FeatureCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    indigo: {
      bg: "bg-indigo-50 group-hover:bg-indigo-100",
      text: "text-indigo-600",
      hover: "hover:shadow-indigo-100",
    },
    purple: {
      bg: "bg-purple-50 group-hover:bg-purple-100",
      text: "text-purple-600",
      hover: "hover:shadow-purple-100",
    },
    blue: {
      bg: "bg-blue-50 group-hover:bg-blue-100",
      text: "text-blue-600",
      hover: "hover:shadow-blue-100",
    },
    emerald: {
      bg: "bg-emerald-50 group-hover:bg-emerald-100",
      text: "text-emerald-600",
      hover: "hover:shadow-emerald-100",
    },
  };

  const selectedColor = colorClasses[color] || colorClasses.indigo;

  return (
    <div
      className={`group relative p-1 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${selectedColor.hover}`}
    >
      {/* Subtle background effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full">
        <div
          className={`${selectedColor.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}
        >
          <div
            className={`${selectedColor.text} transition-transform duration-300 group-hover:scale-125`}
          >
            {cloneElement(icon, { className: "w-6 h-6" })}
          </div>
        </div>

        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
          {title}
        </h4>

        <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
          {description}
        </p>

        {/* Subtle indicator that appears on hover */}
        <div
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 ${selectedColor.bg} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
        />
      </div>
    </div>
  );
};

export default FeatureCard;
