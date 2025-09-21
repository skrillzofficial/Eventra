import React from "react";
import Nav from "../Nav";
import HeroLanding from "../HeroLanding";

const NavWithHero = () => {
  return (
    <div className="Heroimg blend-overlay">
      <Nav />
      <HeroLanding />
    </div>
  );
};

export default NavWithHero;
