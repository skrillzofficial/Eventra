import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  Ticket,
  Key,
  Search as SearchIcon,
} from "lucide-react";
import Brandlogo from "../assets/Logo image.png";
import logo1 from "../assets/Logo image 1.png";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setIsAuthenticated(true);
      setUserData(user);
    }
  }, []);

  // Add scroll effect for glassy background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update state
    setIsAuthenticated(false);
    setUserData(null);
    setIsUserMenuOpen(false);

    // Redirect to home page
    window.location.href = "/";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to search results page or perform search
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const UserDropdown = () => (
    <div className="absolute right-0 top-12 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-white/20">
      <div className="px-4 py-2 border-b border-gray-100/30">
        <p className="text-sm font-medium text-gray-900">
          {userData?.firstName} {userData?.lastName}
        </p>
        <p className="text-xs text-gray-500">{userData?.email}</p>
      </div>
      <NavLink
        to="//profile"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
        onClick={() => setIsUserMenuOpen(false)}
      >
        <User className="h-4 w-4 mr-2" />
        Profile
      </NavLink>

      <NavLink
        to="/my-tickets"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
        onClick={() => setIsUserMenuOpen(false)}
      >
        <Ticket className="h-4 w-4 mr-2" />
        My Tickets
      </NavLink>

      <NavLink
        to="/reset-password"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
        onClick={() => setIsUserMenuOpen(false)}
      >
        <Key className="h-4 w-4 mr-2" />
        Reset Password
      </NavLink>

      <button
        onClick={handleLogout}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Log Out
      </button>
    </div>
  );

  const SearchBar = () => (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md shadow-lg p-3 rounded-md z-40 w-80 border border-white/20">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events, categories, locations..."
          className="flex-1 px-3 py-2 border border-gray-300/50 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#006F6A] text-sm bg-white/50"
          autoFocus
        />
        <button
          type="submit"
          className="bg-[#006F6A] text-white px-3 py-2 rounded-r-md hover:bg-[#005a55] transition-colors"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setIsSearchOpen(false)}
          className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </form>
    </div>
  );

  return (
    <div className="relative">
      {/* Search Overlay */}
      {isSearchOpen && <SearchBar />}

      {/* Fixed Glassy Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Centered */}
            <NavLink to="/" className="flex items-center mx-auto md:mx-0">
              <div className="flex relative">
                <img
                  className="h-3 w-auto absolute right-7 top-5"
                  src={logo1}
                  alt=""
                />
                <img className="h-8 w-auto" src={Brandlogo} alt="Logo" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">Eventra</span>
            </NavLink>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <NavLink
                to="/discover"
                className="text-white px-3 py-2 hidden lg:block hover:text-[#00A89C] text-sm font-medium transition-colors"
              >
                Discover Events
              </NavLink>
              <NavLink
                to="/about"
                className="text-white px-3 py-2 hidden lg:block hover:text-[#00A89C] text-sm font-medium transition-colors"
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className="text-white px-3 py-2 hidden lg:block hover:text-[#00A89C] text-sm font-medium transition-colors"
              >
                Contact
              </NavLink>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center ml-20 md:ml-auto space-x-4">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-[#00A89C] p-2 transition-colors"
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5" />
              </button>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-white hover:text-[#00A89C] transition-colors"
                  >
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      {userData?.firstName?.[0]?.toUpperCase() ||
                        userData?.userName?.[0]?.toUpperCase() || (
                          <User className="h-4 w-4 text-white" />
                        )}
                    </div>
                    <span className="text-sm font-medium hidden lg:block">
                      {userData?.userName || userData?.firstName}
                    </span>
                  </button>
                  {isUserMenuOpen && <UserDropdown />}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <NavLink
                    to="/login"
                    className="text-white px-3 py-2 hidden md:block hover:text-[#00A89C] text-sm font-medium transition-colors"
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="bg-[#006F6A] text-white hidden md:block px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[#005a55] backdrop-blur-sm"
                  >
                    Get Started
                  </NavLink>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#00A89C] hover:bg-white/10 focus:outline-none transition-colors"
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
          <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <NavLink
                to="/discover"
                className="text-white hover:text-[#00A89C] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover Events
              </NavLink>
              <NavLink
                to="/about"
                className="text-white hover:text-[#00A89C] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className="text-white hover:text-[#00A89C] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>

              <div className="pt-4 pb-3 border-t border-white/30">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-white">
                      <p className="font-medium">
                        {userData?.firstName} {userData?.lastName}
                      </p>
                      <p className="text-sm opacity-80">{userData?.email}</p>
                    </div>

                    <NavLink
                      to="/profile"
                      className="text-white hover:text-[#00A89C] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/my-tickets"
                      className="text-white hover:text-[#00A89C] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Tickets
                    </NavLink>
                    <NavLink
                      to="/reset-password"
                      className="text-white hover:text-[#00A89C] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Reset Password
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-white hover:text-[#00A89C] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="text-white hover:text-[#00A89C] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="bg-[#006F6A] text-white block px-3 py-2 rounded-md text-base font-medium transition-colors mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16"></div>
    </div>
  );
};

export default Nav;
