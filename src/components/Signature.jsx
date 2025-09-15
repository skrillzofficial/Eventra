import React from "react";
import Trophy from "../assets/Trophy.png";
import Partymask from "../assets/Party-mask.png";
import Partypopper from "../assets/Party-popper.png";
import PartyDecoration from "../assets/Party-decoration.png";

const Signature = () => {
  const events = [
    {
      id: 1,
      name: "Social Events",
      description: "Theme gatherings, small parties, Team building activities",
      icon: Partypopper,
    },
    {
      id: 2,
      name: "Corporate Events",
      description: "Conferences, product launches, award galas & vip events.",
      icon: Trophy,
    },
    {
      id: 3,
      name: "Lifestyle Events",
      description:
        "Fashion shows, art exhibitions, influencer brunch & exclusive pop-ups.",
      icon: Partymask,
    },
    {
      id: 4,
      name: "Festivals",
      description: "Music and Food festivals, community fairs",
      icon: PartyDecoration,
    },
  ];
  return (
    <div className="bg-white py-5">
      {/* Sigature section */}
      <div className="w-11/12 mx-auto container">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#4A4A4A] mb-4">
            Signature Events
          </h1>
        </div>
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="w-15 h-15 mb-6 flex items-center justify-center">
                <img
                  src={event.icon}
                  alt={event.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#000000] mb-4">
                {event.name}
              </h3>

              {/* Description */}
              <p className="text-[#4A4A4A] leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signature;
