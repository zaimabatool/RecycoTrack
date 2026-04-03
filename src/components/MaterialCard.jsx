import React from "react";
import { RxDotFilled } from "react-icons/rx";

function MaterialCard({ name, icons, des, clr }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <span className="text-xs font-bold text-green-600 flex items-center bg-green-50 px-2 py-1 rounded-full border border-green-100">
          <RxDotFilled className="text-lg" /> Accepted
        </span>
      </div>

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 ${clr}`}>
        {icons}
      </div>

      <h3 className="text-xl mb-3 font-bold text-secondary">
        {name}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {des}
      </p>
    </div>
  );
}

export default MaterialCard;
