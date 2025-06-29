import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorPage from '../ErrorPage.jsx';

const AddMember = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        age: "",
        gender: "",
        dob: "",
        relation: "",
        bloodGroup: "",
        height: "",
        weight: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasEmptyField = Object.values(values).some((val) => val.trim() === "");
        if (hasEmptyField) {
            toast.error("All fields are required");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3001/api/v1/add-member",
                values,
                { withCredentials: true }
            );
            toast.success(res.data.message || "Member added successfully");
            // navigate("/profile");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to add member");
        }
    };

    if (!isLoggedIn) return <ErrorPage />;

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center bg-gradient-to-r ">
            <ToastContainer position="top-center" autoClose={5000} />
            <div className="w-[90%] md:w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Add New Member</h2>

                <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={values.age}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                            required
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={values.dob}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Relation</label>
                        <input
                            type="text"
                            name="relation"
                            value={values.relation}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Blood Group</label>
                        <input
                            type="text"
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={values.height}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={values.weight}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-900 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg py-2 shadow-md transition-all"
                        >
                            Add Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMember;
