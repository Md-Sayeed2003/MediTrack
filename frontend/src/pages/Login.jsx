import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { authActions } from '../store/auth.js';
import ErrorPage from './ErrorPage.jsx';

const Login = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = values;

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3001/api/v1/login", values, {
                withCredentials: true,
            });

            dispatch(authActions.login());
            toast.success(res.data.message || "Login successful!");
            navigate("/profile");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    if (isLoggedIn) return <ErrorPage />;

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
            <ToastContainer position="top-center" autoClose={5000} />
            <div className="w-4/6 md:w-3/6 lg:w-2/6 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
                <Link to="/" className="text-3xl font-bold text-blue-900 hover:text-blue-700 transition-all">
                    MediTrack
                </Link>

                <form className="mt-6 w-full" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col">
                        <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
                        />
                    </div>

                    <div className="w-full flex flex-col mt-4">
                        <label htmlFor="password" className="font-semibold text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-900 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg py-2 shadow-md transition-all"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-semibold text-blue-800 hover:text-blue-600 transition-all">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
