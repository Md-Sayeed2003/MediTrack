import React from 'react';

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">About MediTrack</h1>

        <p className="text-gray-800 text-lg mb-6">
          <strong>MediTrack</strong> is a healthcare record management application designed to help you securely store and manage medical information of your family and friends. From doctor visits to test reports and regular health checkups, MediTrack keeps all your medical records organized in one place.
        </p>

        <div className="bg-blue-100 p-6 rounded-xl mb-6 text-left">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Key Features:</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Add Member Profiles</li>
            <li>Add and View Test Reports</li>
            <li>Add and Regular Checkup Records</li>
            <li>Add and Doctor Visit Details</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl mb-6 text-left">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Technology Stack:</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Frontend: React.js</li>
            <li>Backend: Node.js & Express.js</li>
            <li>Database: MongoDB</li>
          </ul>
        </div>

        <p className="text-gray-600 italic mt-4">Created by <strong>Md Sayeed</strong></p>
      </div>
    </div>
  );
};

export default LearnMore;
