
import React from 'react';
import { useSelector } from 'react-redux';
import ErrorPage from '../ErrorPage.jsx';

const UserDetails = ({ user }) => {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  if(!isLoggedIn) return <ErrorPage/>;

  if (!user) {
    return (
      <div className="w-full flex justify-center items-center min-h-[20vh] bg-blue-50 p-6">
        <div className="text-gray-500 text-lg">Loading user data...</div>
      </div>
    );
  }

  const details = [
    { label: 'Username', value: user.username },
    { label: 'Email', value: user.email },
    { label: 'Age', value: user.age },
    { label: 'Date of Birth', value: new Date(user.dob).toLocaleDateString() },
    { label: 'Blood Group', value: user.bloodGroup },
    { label: 'Height', value: `${user.height} cm` },
    { label: 'Weight', value: `${user.weight} kg` },
    { label: 'Created At', value: new Date(user.createdAt).toLocaleString() },
  ];

  return (
    <div className="w-full bg-blue-50 px-6 py-10">
      <div className="w-full bg-white border border-black shadow-lg rounded-xl p-6 md:p-10 mx-auto">
        <div className="bg-gray-800 px-4 py-3 rounded-md mb-8">
          <h2 className="text-white text-2xl font-semibold">User Profile</h2>
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
    </div>
  );
};

export default UserDetails;


