import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaLock, FaCloudUploadAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <section className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* Text Section */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-4">
            Simplify Your Family's Medical Records with <span className="text-blue-700">MediTrack</span>
          </h1>
          <p className="text-lg text-gray-800 mb-6">
            Securely store, manage, and access your family's medical history, prescriptions, and appointments — anytime, anywhere.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="inline-flex items-center gap-2 bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <FaLock /> End-to-End Encryption
            </span>
            <span className="inline-flex items-center gap-2 bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <FaCloudUploadAlt /> Easy Access
            </span>
            <span className="inline-flex items-center gap-2 bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              <FaUserMd /> Store Data 
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Link to="/profile" className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-all">
              Get Started
            </Link>
            <Link to="/learn-more" className="border border-blue-900 text-blue-900 px-6 py-3 rounded-full hover:bg-blue-900 hover:text-white transition-all">
              Learn More
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 p-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4534/4534984.png"
            alt="Health Tracker"
            className="w-full max-w-sm mx-auto md:max-w-full animate-fade-in drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;



