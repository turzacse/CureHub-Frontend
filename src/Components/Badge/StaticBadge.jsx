import React from "react";

const StarBadge = () => {
  return (
    <div className="flex items-end mb-20 justify-center ">
      {/* Badge Wrapper */}
      <div className="relative group flex flex-col items-center">
        {/* Starburst Shape */}
        <div className="relative w-12 h-12 bg-yellow-700 rounded-full shadow-lg">
          <div className="absolute inset-0 bg-yellow-500 rounded-full blur-md" />
          <div className="absolute inset-2 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className=" font-bold text-white">CH</span>
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute top-[-3.8rem] bg-[#78cccc] text-gray-700 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center w-[60px] h-[60px] text-[8px] flex items-center">
          Membership Planned
        </div>
      </div>
    </div>
  );
};

export default StarBadge;
