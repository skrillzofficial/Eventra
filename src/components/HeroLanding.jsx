import React from 'react'

const HeroLanding = () => {
  return (
    <div className="">
      {/* Hero for Landing Page */}
      <div className="w-11/12 mx-auto container p-10">
        <div className="my-10 text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white leading-tight">
             Discover Events That Inspire and Connect
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed">
              Your complete destination for discovering, booking, and experiencing events that truly matter to you.
            </p>
          </div>
          <div>
            <button className="bg-[#006F6A] hover:bg-[#005a55] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-md">
              Explore Events
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroLanding