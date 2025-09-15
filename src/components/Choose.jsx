import React from "react";
import Access from "../assets/Access.png";
import Bookings from "../assets/Booking.png";
import Event from "../assets/Event.png";

const Choose = () => {
  const features = [
    {
      id: 1,
      icon: Event,
      title: "Endless Event Options",
      description: "From local gatherings to international festivals, explore a wide variety of events tailored to every interest.",
    },
    {
      id: 2,
      icon: Bookings,
      title: "Fast & Secure Booking",
      description: "Reserve your spot instantly with our safe, simple, and seamless checkout process designed for peace of mind.",
    },
    {
      id: 3,
      icon: Access,
      title: "Hassle-Free Access",
      description: "Get your digital ticket delivered straight to your inbox the moment you book. Skip the stress of long lines, misplaced paper tickets.",
    }
  ];

  return (
    <div className="bg-white py-5">
      <div className="w-11/12 mx-auto container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">
            Why Choose Us?
          </h1>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            The trusted platform for unforgettable experiences
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="w-15 h-15 mb-6 flex items-center justify-center">
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-[#000000] mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-[#4A4A4A] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choose;