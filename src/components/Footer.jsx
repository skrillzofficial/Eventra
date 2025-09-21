import React from "react";
import Brandlogo from "../assets/FooterLogo.png";
import logo1 from "../assets/Logo image 1.png";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#006F6A] text-[#E6F1F0]">
      <div className="w-11/12 mx-auto container py-5">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Company Info*/}
          <div className="md:w-2/5 space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="flex items-center">
                <div className="flex relative">
                  <img
                    className="h-3 w-auto absolute right-7 top-5"
                    src={logo1}
                    alt=""
                  />
                  <img className="h-8 w-auto" src={Brandlogo} alt="Logo" />
                </div>
              </div>
              <span className="text-xl ml-2 font-bold">Eventra</span>
            </div>
            <p className="text-sm text-center md:text-start">
              EVENTRA connects you to unforgettable events and experiences.
              Discover, book, and enjoy with ease, anytime and anywhere.
            </p>
            <div className="flex space-x-4 items-center justify-center md:justify-start">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links and Contact Container */}
          <div className="md:w-3/5 flex flex-col items-center justify-center  sm:flex-row gap-8">
            {/* Contact Info */}
            <div className="sm:w-1/3 text-center md:text-start">
              <h3 className="text-lg  font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <p className="text-sm">eventra@gmail.com</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm">+234 7081981212 </p>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="sm:w-1/3 text-center md:text-start">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Event
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="sm:w-1/3 text-center md:text-start">
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Term of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-9 border-opacity-20 text-center">
          <p className="text-sm">© 2023 Eventra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
