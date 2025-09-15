import React from "react";

const Work = () => {
  const steps = [
    {
      id: 1,
      title: "Discover Events",
      description:
        "Explore concerts, festivals, and gatherings near you. Find the experience that matches your vibe.",
    },
    {
      id: 2,
      title: "Book Instantly",
      description:
        "Reserve your spot in just a few clicks. Fast, secure, and hassle-free every time.",
    },
    {
      id: 3,
      title: "Get Your Pass",
      description:
        "Your digital ticket arrives instantly after booking. Scan and enjoy smooth entry to the event.",
    },
  ];

  return (
    <div className="bg-white py-5">
      <div className="w-11/12 mx-auto container">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">
            How It Works?
          </h1>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            Discover, book, and enjoy with ease
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center px-4 py-10 border shadow-sm border-[#ffff] rounded-2xl "
            >
              {/* Number Circle */}
              <div className="w-10 h-10 rounded-full bg-[#006F6A] flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-white">
                  {step.id}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#000000] mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#4A4A4A] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
