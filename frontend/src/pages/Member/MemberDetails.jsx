
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ErrorPage from '../ErrorPage.jsx';
import { useSelector } from 'react-redux';

const MemberDetails = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  if(!isLoggedIn) return <ErrorPage/>;

  const [member, setMember] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/member-details/${id}`, {
          withCredentials: true,
        });
        setMember(res.data.member); 
      } catch (error) {
        console.error("Failed to fetch member details:", error);
      }
    };

    fetchMember();
  }, [id]);

  if (!member) {
    return (
      <div className="w-full flex justify-center items-center min-h-[20vh] bg-gray-50 p-6">
        <div className="text-gray-500 text-lg">Loading member data...</div>
      </div>
    );
  }

  const details = [
    { label: 'Name', value: member.name },
    { label: 'Relation', value: member.relation },
    { label: 'Gender', value: member.gender },
    { label: 'Age', value: member.age },
    { label: 'Date of Birth', value: new Date(member.dob).toLocaleDateString() },
    { label: 'Blood Group', value: member.bloodGroup },
    { label: 'Height', value: `${member.height} cm` },
    { label: 'Weight', value: `${member.weight} kg` },
    { label: 'Created At', value: new Date(member.createdAt).toLocaleString() },
  ];

  return (
    <div className="w-full bg-gray-50 px-6 py-10">
      <div className="w-full bg-white border border-black shadow-lg rounded-xl p-6 md:p-10 mx-auto">
        <div className="bg-gray-800 px-4 py-3 rounded-md mb-8">
          <h2 className="text-white text-2xl font-semibold">Member Details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-gray-900 text-lg">
          {details.map((item, index) => (
            <div key={index} className="border-b border-black pb-3">
              <p className="text-sm uppercase text-gray-600 tracking-wide">{item.label}</p>
              <p className="text-xl font-mono text-black">{item.value}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="flex flex-wrap justify-center gap-8 m-10">
  
        <Link
          to={`/add-doctor-visit/${member._id}`}
          className="w-64 h-36 bg-blue-100 text-black text-lg font-semibold rounded-2xl shadow-sm flex items-center justify-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-blue-200"
        >
         Add Doctor Visit
        </Link>

  
        <Link
          to={`/add-regular-checkup/${member._id}`}
          className="w-64 h-36 bg-green-100 text-black text-lg font-semibold rounded-2xl shadow-sm flex items-center justify-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-green-200"
        >
          Add Regular Checkup
        </Link>

   
        <Link
          to={`/add-test-report/${member._id}`}
          className="w-64 h-36 bg-purple-100 text-black text-lg font-semibold rounded-2xl shadow-sm flex items-center justify-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-purple-200"
        >
          Add Test Report
        </Link>
      </div>


    </div>
  );
};

export default MemberDetails;
