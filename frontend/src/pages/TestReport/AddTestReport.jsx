
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorPage from '../ErrorPage.jsx';
import { useSelector } from 'react-redux';

const AddTestReport = () => {
  const { memberId } = useParams();

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  if(!isLoggedIn) return <ErrorPage/>;

  const [formData, setFormData] = useState({
    doctorName: '',
    date: '',
    disease: '',
    details: ''
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
      return toast.error('Image is required');
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('doctorName', formData.doctorName);
      data.append('date', formData.date);
      data.append('disease', formData.disease);
      data.append('details', formData.details);
      data.append('image', image);

      const res = await axios.post(
        `http://localhost:3001/api/v1/add-test-report/${memberId}`,
        data,
        { withCredentials: true }
      );

      toast.success(res.data.message || 'Test report added successfully');

      setFormData({
        doctorName: '',
        date: '',
        disease: '',
        details: ''
      });
      setImage(null);
      setPreviewUrl(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
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
                <p className="mb-2">🧾 Drag & drop the test report here</p>
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Add Test Report</h2>

          {[
            { name: 'doctorName', type: 'text', label: 'Doctor Name' },
            { name: 'date', type: 'date', label: 'Date' },
            { name: 'disease', type: 'text', label: 'Disease' }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Report Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 mt-4 rounded-md shadow-md transition duration-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTestReport;

