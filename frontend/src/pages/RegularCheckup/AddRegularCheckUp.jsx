
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ErrorPage from '../ErrorPage.jsx';

const AddRegularCheckup = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  if(!isLoggedIn) return <ErrorPage/>;

  const { memberId } = useParams();

  const [formData, setFormData] = useState({
    date: '',
    bp: '',
    sl_fasting: '',
    sl_random: '',
    sl_pp: '',
    bodyTemp: '',
    spo2: '',
    heartRate: '',
    colestrolLevel: '',
    weight: '',
    bmi: '',
    sleepDuration: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
    

      const res = await axios.post(
        `http://localhost:3001/api/v1/add-regular-checkup/${memberId}`,
        formData,
        {
          withCredentials : true
        }
      );

      toast.success(res.data.message || 'Regular checkup added successfully');

      setFormData({
        date: '',
        bp: '',
        sl_fasting: '',
        sl_random: '',
        sl_pp: '',
        bodyTemp: '',
        spo2: '',
        heartRate: '',
        colestrolLevel: '',
        weight: '',
        bmi: '',
        sleepDuration: ''
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Add Regular Checkup
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {[
            { name: 'date', type: 'date', label: 'Date' },
            { name: 'bp', type: 'text', label: 'Blood Pressure', placeholder: 'e.g. 120/80' },
            { name: 'sl_fasting', type: 'number', label: 'Sugar Level - Fasting', placeholder: 'e.g. 90' },
            { name: 'sl_random', type: 'number', label: 'Sugar Level - Random', placeholder: 'e.g. 140' },
            { name: 'sl_pp', type: 'number', label: 'Sugar Level - PP', placeholder: 'e.g. 130' },
            { name: 'bodyTemp', type: 'number', label: 'Body Temperature (°C)', step: '0.1', placeholder: 'e.g. 36.5' },
            { name: 'spo2', type: 'number', label: 'SPO2 (%)', step: '1', min: '0', max: '100', placeholder: 'e.g. 98' },
            { name: 'heartRate', type: 'number', label: 'Heart Rate (bpm)', step: '1', placeholder: 'e.g. 72' },
            { name: 'colestrolLevel', type: 'number', label: 'Cholesterol Level (mg/dL)', step: '1', placeholder: 'e.g. 180' },
            { name: 'weight', type: 'number', label: 'Weight (kg)', step: '0.1', placeholder: 'e.g. 70.5' },
            { name: 'bmi', type: 'number', label: 'BMI', step: '0.1', placeholder: 'e.g. 22.4' },
            { name: 'sleepDuration', type: 'number', label: 'Sleep Duration (hrs)', step: '0.5', placeholder: 'e.g. 7.5' }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md w-full transition duration-300"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Add Checkup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRegularCheckup;


