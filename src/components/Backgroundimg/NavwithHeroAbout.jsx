import React from "react";
import Nav from "../Nav";
import HeroAbout from "../HeroAbout";

const NavwithHeroAbout = () => {
  return (
    <div className="AboutHeroimg blend-overlay">
      <Nav />
      <HeroAbout />
    </div>
  );
};

export default NavwithHeroAbout;
