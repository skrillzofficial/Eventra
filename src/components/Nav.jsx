import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Brandlogo from "../assets/Logo image.png";
import logo1 from "../assets/Logo image 1.png";
import Search from "../assets/Search.png";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="">
      {/* Navbar */}
      <nav className="w-11/12 mx-auto container">
        <div className="max-w-7xl">
          <div className="flex justify-between h-16">
            <a href="/">
              <div className="flex items-center">
                <div className="flex relative">
                  <img
                    className="h-3 w-auto absolute right-7 top-5"
                    src={logo1}
                    alt=""
                  />
                  <img className="h-8 w-auto" src={Brandlogo} alt="Logo" />
                </div>

                <span className="ml-2 text-xl font-bold text-white">
                  Eventra
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
              <div className="flex space-x-4 mr-20">
                <a
                  href="/discover"
                  className="text-white px-3 py-2 hover:text-[#006F6A] text-sm font-medium"
                >
                  Discover Events
                </a>
                <a
                  href="/about"
                  className="text-white px-3 py-2 hover:text-[#006F6A] text-sm font-medium"
                >
                  About Us
                </a>
                <a
                  href="/contact"
                  className="text-white px-3 py-2 hover:text-[#006F6A] text-sm font-medium"
                >
                  Contact
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="#
                "
                >
                  <div className="w-4 h-4 ">
                    <img src={Search} alt="search icon" />
                  </div>
                </a>
                <a
                  href="/login"
                  className="text-white px-3 py-2 hover:text-[#006F6A] text-sm font-medium"
                >
                  Sign in
                </a>
                <a
                  href="/signup"
                  className="bg-[#006F6A] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#006F6A] hover:bg-blue-400 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#006F6A] shadow-lg rounded-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="text-white hover:text-[#006F6A] block px-3 py-2 rounded-md text-base font-medium"
              >
                Discover Events
              </a>
              <a
                href="#"
                className="text-white hover:text-[#006F6A] block px-3 py-2 rounded-md text-base font-medium"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-white hover:text-[#006F6A] block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </a>
              <div className="pt-4 pb-3 border-t border-[#ffff]">
                <a
                  href="#"
                  className="text-white hover:text-[#006F6A] block px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign in
                </a>
                <a
                  href="#"
                  className="bg-white text-[#006F6A] block px-3 w-fit py-2 rounded-md text-base font-medium transition-colors mt-2"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
