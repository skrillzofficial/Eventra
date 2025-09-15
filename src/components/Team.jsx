import React from "react";
import Busayo from "../assets/Busayo .png";
import Federick from "../assets/Federick.png";
import Gold from "../assets/Gold.png";
const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Busayo abigeal",
      role: "CEO / Event manager",
      icon: Busayo,
    },
    { id: 2, name: "Fedrick Jasper", role: "Director", icon: Federick },
    { id: 3, name: "Gold Bridget", role: "Finance Manager", icon: Gold },
  ];
  return (
    <div className="bg-[#F7F9FF] py-5">
      <div className="w-11/12 mx-auto container">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#083F3D] mb-4">
            Meet the Team
          </h1>
        </div>
        {/* Teams */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {teamMembers.map((teamMember) => (
            <div 
              key={teamMember.id} 
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="w-40 h-40 mb-4 flex items-center justify-center">
                <img 
                  src={teamMember.icon} 
                  alt={teamMember.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-[#4A4A4A] mb-2">
                {teamMember.name}
              </h3>
              
              {/* Description */}
              <p className="text-[#4A4A4A] leading-relaxed">
                {teamMember.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
