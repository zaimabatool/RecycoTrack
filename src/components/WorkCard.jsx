import React from "react";

function WorkCard({ names, icon, desc, clrs }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full group">
      <div className={`w-14 h-14 rounded-xl text-white flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 ${clrs}`}>
        {icon}
      </div>

      <h3 className="text-xl mb-3 font-bold text-secondary">
        {names}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default WorkCard;
