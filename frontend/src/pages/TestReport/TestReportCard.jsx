import React from 'react'
import { Link } from 'react-router-dom';

const TestReportCard = ({data}) => {
   return (
    <Link to={`/get-test-report/${data._id}`} className="block">
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-md mx-auto mt-6 border border-gray-200 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        
        
        <div className="absolute top-4 right-4 bg-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {data.memberRelation}
        </div>

        
        <div className="text-center mt-8 mb-4">
          <h1 className="text-4xl font-semibold text-gray-800 tracking-wide">{data.memberName}</h1>
        </div>

        
        <div className="text-center text-gray-600 text-sm space-y-1">
          <p>
            <span className="font-medium text-gray-700">Age:</span> {data.memberAge}
          </p>
          <p>
            <span className="font-medium text-gray-700">Date:</span> {data.date}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TestReportCard