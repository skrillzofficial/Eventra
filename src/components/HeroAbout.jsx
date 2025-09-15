import React from "react";

const HeroAbout = () => {
  return (
    <div className="">
      {/* Hero section for About page */}
      <div className="w-11/12 mx-auto container p-10">
        <div className="my-10 text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white leading-tight">
             About Eventra
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed">
              We’re on a mission to make attending and organizing events seamless, memorable, and inspiring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAbout;
