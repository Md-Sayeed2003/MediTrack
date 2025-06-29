
import React, { useEffect, useState } from 'react';
import UserDetails from './Member/UserDetails.jsx';
// import GetAllMembers from './Member/GetAllMembers.jsx';
import MemberCard from './Member/MemberCard.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ErrorPage from './ErrorPage.jsx';

const Profile = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  if(!isLoggedIn) return <ErrorPage/>;

  const [userData, setUserData] = useState({});
  const [member, setMember] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/user-details", { withCredentials: true });
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/get-all-member", { withCredentials: true });
        setMember(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-4 lg:px-12 py-6 space-y-10">

      
      <div>
        <UserDetails user={userData} />
      </div>

      
      <div className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">Members</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10 lg:grid-cols-4 gap-6">
          {member && member.map((item, i) => (
            <MemberCard key={i} data={item} />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
