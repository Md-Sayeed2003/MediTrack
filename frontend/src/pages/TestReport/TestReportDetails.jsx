import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorPage from '../ErrorPage.jsx';

const TestReportDetails = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  if(!isLoggedIn) return <ErrorPage/>;

  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/get-test-report/${id}`, {
          withCredentials: true,
        });
        setData(res.data.data);
      } catch (error) {
        console.error('Error fetching test report:', error);
      }
    };

    fetch();
  }, [id]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-xl">
        Loading test report details...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">

      <div className="md:w-1/2 w-full flex items-center justify-center border-r border-gray-300 p-6 bg-white">
        <img
          src={data.image?.url}
          alt="Test Report"
          className="w-full max-w-xl h-auto object-cover border border-gray-300 rounded-lg"
        />
      </div>

      <div className="md:w-1/2 w-full p-10 overflow-y-auto space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">{data.memberName}</h2>

        <div className="flex flex-wrap items-center gap-4 text-lg text-gray-700 font-medium">
          <span className="bg-orange-300 text-black text-sm px-4 py-1 rounded-full">
            {data.memberRelation}
          </span>
          <span>Age: <strong>{data.memberAge}</strong></span>
        </div>

        <div className="flex flex-wrap gap-10 text-xl text-gray-700 font-medium">
          <span>Doctor: <strong>{data.doctorName}</strong></span>
          <span>Date: <strong>{new Date(data.date).toLocaleDateString()}</strong></span>
        </div>

        <div className="text-xl text-gray-700">
          <p><strong>Disease:</strong> {data.disease}</p>
        </div>

        <div className="text-xl text-gray-700">
          <p className="font-semibold mb-1">Report Details:</p>
          <p className="whitespace-pre-line">{data.details}</p>
        </div>
      </div>
    </div>
  );
};

export default TestReportDetails;
