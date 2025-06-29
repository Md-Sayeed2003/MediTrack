import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full h-[10vh] bg-gray-100 text-gray-800 border-t border-gray-300 flex items-center px-6 md:px-16">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center text-sm">

        {/* Brand / Tagline */}
        <div className="text-center md:text-left mb-2 md:mb-0">
          <span className="font-bold text-lg">MediTrack</span> – Simple, secure medical record management.
        </div>

        {/* Contact + Social Icons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-700" />
            <span>support@meditrack.com</span>
          </div>
          <div className="flex gap-3 ml-4">
            <a href="#" className="hover:text-blue-700 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-700 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-700 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
