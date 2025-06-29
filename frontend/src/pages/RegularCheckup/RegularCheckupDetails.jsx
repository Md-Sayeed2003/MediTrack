import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorPage from '../ErrorPage.jsx';

const RegularCheckupDetails = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  
  if(!isLoggedIn) return <ErrorPage/>;

  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/get-regular-checkup/${id}`, {
          withCredentials: true,
        });
        setData(res.data.data);
      } catch (error) {
        console.error('Error fetching regular checkup details:', error);
      }
    };

    fetch();
  }, [id]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-2xl">
        Loading regular checkup details...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-6 md:px-24">
      <div className="max-w-7xl min-h-[90vh] mx-auto bg-white rounded-2xl shadow-lg p-12 space-y-10 border border-gray-300">
        <h2 className="text-5xl font-bold text-gray-900">{data.memberName}</h2>

        <div className="flex flex-wrap items-center gap-6 text-xl text-gray-800 font-semibold">
          <span className="bg-orange-300 text-black text-base px-4 py-1 rounded-full">
            {data.memberRelation}
          </span>
          <span>Age: <span className="font-bold">{data.memberAge}</span></span>
          <span>Date: <span className="font-bold">{data.date}</span></span>
        </div>

        <hr className="border-t border-gray-300" />

        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Vitals</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 text-xl text-gray-700">
            <p><strong>BP:</strong> {data.bp}</p>
            <p><strong>Body Temp (°C):</strong> {data.bodyTemp}</p>
            <p><strong>SPO₂ (%):</strong> {data.spo2}</p>
            <p><strong>Heart Rate:</strong> {data.heartRate} bpm</p>
            <p><strong>Cholesterol Level:</strong> {data.colestrolLevel}</p>
            <p><strong>Weight (kg):</strong> {data.weight}</p>
            <p><strong>BMI:</strong> {data.bmi}</p>
            <p><strong>Sleep Duration (hrs):</strong> {data.sleepDuration}</p>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Sugar Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xl text-gray-700">
            <p><strong>Fasting:</strong> {data.sugarLevel?.fasting}</p>
            <p><strong>Random:</strong> {data.sugarLevel?.random}</p>
            <p><strong>PP:</strong> {data.sugarLevel?.pp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularCheckupDetails;
