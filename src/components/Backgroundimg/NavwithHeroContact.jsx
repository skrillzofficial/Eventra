import React from "react";
import Nav from "../Nav";
import HeroContact from "../HeroContact";

const NavwithHeroContact = () => {
  return ( 
    <div className="ContactHeroimg blend-overlay">
      <Nav />
      <HeroContact/>
    </div>
  );
};

export default NavwithHeroContact;
