// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { useSelector } from 'react-redux';
// import ErrorPage from './ErrorPage';

// const SignUp = () => {
//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//     const navigate = useNavigate(); 

//     const [values, setValues] = useState({
//         username: "",
//         email: "",
//         password: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setValues((prevValues) => ({
//             ...prevValues,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { username, email, password } = values;

//         if (!username || !email || !password) {
//             toast.error("All fields are required");
//             return;
//         }

//         try {
//             const res = await axios.post("http://localhost:3001/api/v1/sign-up", values);
//             toast.success(res.data.message || "Signup successful!");
//             navigate("/");
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Signup failed");
//         }
//     };

//     if (isLoggedIn) return <ErrorPage />;

//     return (
//         <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
//             <ToastContainer position="top-center" autoClose={5000} />
//             <div className="w-4/6 md:w-3/6 lg:w-2/6 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
//                 <Link to="/" className="text-3xl font-bold text-blue-900 hover:text-blue-700 transition-all">
//                     MediTrack
//                 </Link>

//                 <form className="mt-6 w-full" onSubmit={handleSubmit}>
//                     <div className="w-full flex flex-col">
//                         <label htmlFor="username" className="font-semibold text-gray-700">Username</label>
//                         <input
//                             id="username"
//                             type="text"
//                             name="username"
//                             placeholder="Enter your username"
//                             value={values.username}
//                             onChange={handleChange}
//                             className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
//                             required
//                         />
//                     </div>

//                     <div className="w-full flex flex-col mt-4">
//                         <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
//                         <input
//                             id="email"
//                             type="email"
//                             name="email"
//                             placeholder="Enter your email"
//                             value={values.email}
//                             onChange={handleChange}
//                             className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
//                             required
//                         />
//                     </div>

//                     <div className="w-full flex flex-col mt-4">
//                         <label htmlFor="password" className="font-semibold text-gray-700">Password</label>
//                         <input
//                             id="password"
//                             type="password"
//                             name="password"
//                             placeholder="Enter your password"
//                             value={values.password}
//                             onChange={handleChange}
//                             className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full mt-6 bg-blue-900 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg py-2 shadow-md transition-all"
//                     >
//                         Sign Up
//                     </button>

//                     <p className="text-center text-gray-600 mt-4">
//                         Already have an account?{" "}
//                         <Link to="/login" className="font-semibold text-blue-800 hover:text-blue-600 transition-all">
//                             Login
//                         </Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUp;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ErrorPage from './ErrorPage';

const SignUp = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    bloodGroup: "",
    height: "",
    weight: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, age, dob, bloodGroup, height, weight } = values;

    if (!username || !email || !password || !age || !dob || !bloodGroup || !height || !weight) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/v1/sign-up", values);
      toast.success(res.data.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  if (isLoggedIn) return <ErrorPage />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="w-4/6 md:w-3/6 lg:w-2/6 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
        <Link to="/" className="text-3xl font-bold text-blue-900 hover:text-blue-700 transition-all">
          MediTrack
        </Link>

        <form className="mt-6 w-full" onSubmit={handleSubmit}>
          {[
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Age", name: "age", type: "number" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Blood Group", name: "bloodGroup", type: "text" },
            { label: "Height (cm)", name: "height", type: "number" },
            { label: "Weight (kg)", name: "weight", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name} className="w-full flex flex-col mt-4 first:mt-0">
              <label htmlFor={name} className="font-semibold text-gray-700">{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={values[name]}
                onChange={handleChange}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="mt-2 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-900 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg py-2 shadow-md transition-all"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-800 hover:text-blue-600 transition-all">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

