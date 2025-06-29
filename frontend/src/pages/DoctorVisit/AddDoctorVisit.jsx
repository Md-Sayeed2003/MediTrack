
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ErrorPage from '../ErrorPage.jsx';

const AddDoctorVisit = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  if(!isLoggedIn) return <ErrorPage/>;

  const { memberId } = useParams();

  const [formData, setFormData] = useState({
    doctorName: '',
    date: '',
    disease: '',
    symptoms: '',
    recommendation: ''
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Image is required');
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('doctorName', formData.doctorName);
    data.append('date', formData.date);
    data.append('disease', formData.disease);
    data.append('symptoms', formData.symptoms);
    data.append('recommendation', formData.recommendation);
    data.append('image', image);

    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/add-doctorVisit/${memberId}`,
        data,
        { withCredentials: true }
      );
      toast.success(res.data.message || 'Visit added successfully');

      // Reset form
      setFormData({
        doctorName: '',
        date: '',
        disease: '',
        symptoms: '',
        recommendation: ''
      });
      setImage(null);
      setPreviewUrl(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add visit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-6xl flex flex-col lg:flex-row gap-10">
        {/* Image Upload */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div
            className={`h-[55vh] w-full max-w-md flex items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer ${drag ? "bg-blue-100" : "bg-gray-100 hover:bg-gray-200"} transition-all duration-300`}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={handleDropImage}
          >
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              id="file"
              className="hidden"
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-cover rounded-2xl"
              />
            ) : (
              <label htmlFor="file" className="text-lg text-gray-500 text-center p-6">
                <p className="mb-2">📁 Drag & drop the image here</p>
                <p>
                  or <span className="font-semibold text-blue-600 underline">click to browse</span>
                </p>
              </label>
            )}
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 flex flex-col space-y-4"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Add Doctor Visit</h2>

          {[
            { label: "Doctor Name", name: "doctorName", type: "text" },
            { label: "Date", name: "date", type: "date" },
            { label: "Disease", name: "disease", type: "text" }
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}

          {[
            { label: "Symptoms", name: "symptoms" },
            { label: "Recommendation", name: "recommendation" }
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                rows={3}
                required
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 mt-4 rounded-md shadow-md transition duration-300"
          >
            {loading ? 'Submitting...' : 'Add Visit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorVisit;

 


