import React from "react";
import vision1 from "../assets/Vision one.png";
import vision2 from "../assets/Vision 2.png";
import vision3 from "../assets/Vision 3.png";

const Vision = () => {
  return (
    <div className="min-h-screen  py-5 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-center text-[#4A4A4A] mb-6">
                Your vision. Our expertise. Extraordinary events.
                <p className="text-2xl md:text-4xl font-semibold text-[#EDBA37]">
                  Dominate the scene.
                </p>
              </h1>
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <img
                src={vision1}
                alt="Vision illustration"
                className="relative rounded-xl shadow-lg w-full h-auto object-cover transform group-hover:scale-[1.02] transition duration-300"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <img
                  src={vision2}
                  alt="Vision illustration 2"
                  className="relative rounded-xl shadow-lg w-full h-64 object-cover transform group-hover:scale-[1.02] transition duration-300"
                />
              </div>

              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <img
                  src={vision3}
                  alt="Vision illustration 3"
                  className="relative rounded-xl shadow-lg w-full h-64 object-cover transform group-hover:scale-[1.02] transition duration-300"
                />
              </div>
            </div>

            <div className="bg-white p-6">
              <p className="text-lg md:text-xl text-[#000000] font-bold text-center">
                Managed more than 1000+ events that created lasting and still
                creating impressions
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-4 mt-4">
              <div className="bg-white text-center">
                <h3 className="text-2xl font-bold text-[#004E4A]">23K+</h3>
                <p className="text-[#4A4A4A]">Events hosted</p>
              </div>
              <div className="bg-white text-center">
                <h3 className="text-2xl font-bold text-[#004E4A]">30K+</h3>
                <p className="text-[#4A4A4A]">Satisfied customers</p>
              </div>
              <div className="bg-white text-center">
                <h3 className="text-2xl font-bold text-[#004E4A]">12+</h3>
                <p className="text-[#4A4A4A]">Years of mastery</p>
              </div>
              <div className="bg-white text-center">
                <h3 className="text-2xl font-bold text-[#004E4A]">65+</h3>
                <p className="text-[#4A4A4A]">Worldwide users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
