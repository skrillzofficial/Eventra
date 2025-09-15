import React from "react";
import Briefcase from "../assets/briefcase-03.png";
import Football from "../assets/football.png";
import Party from "../assets/party.png";
import Controller from "../assets/game-controller-03.png";
import Message from "../assets/message-favourite-02.png";
import Restaurant from "../assets/restaurant-03.png";

const Category = () => {
  const categories = [
    {
      id: 1,
      name: "Business",
      icon: Briefcase,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      name: "Sports",
      icon: Football,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      name: "Festivals",
      icon: Party,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      id: 4,
      name: "Food & Drinks",
      icon: Restaurant,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 5,
      name: "Dating",
      icon: Message,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: 6,
      name: "Hobbies",
      icon: Controller,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="bg-white py-5">
      <div className="w-11/12 mx-auto container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">
            Event Category
          </h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center p-4 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div
                className={`w-13 h-13 rounded-full ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-90 transition-transform duration-300`}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-sm font-medium text-[#000000] text-center group-hover:text-[#006F6A] transition-colors duration-300">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
