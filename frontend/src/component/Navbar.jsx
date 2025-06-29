
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { IoReorderThreeOutline } from "react-icons/io5";
// import { RxCross2 } from "react-icons/rx";
// import { useSelector } from 'react-redux';

// const Navbar = () => {
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const [MobileNav, setMobileNav] = useState(false);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name : "DoctorVisit" , path : "/get-all-doctor-visit"},
//     { name : "TestReport" , path : "/get-all-test-report"},
//     { name : "RegularCheckUp" , path : "/get-all-regular-checkup"},
//     { name: "Add Member", path: "/add-member" },
//     { name : "Logout", path:"/logout" },
//     { name : "Profile" , path : "/profile"}

//   ];

//   return (
//     <>
//       <nav className="px-6 md:px-12 py-4 bg-blue-300 shadow-lg">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-4">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/11411/11411445.png"
//               className="h-12"
//               alt="MediTrack"
//             />
//             <Link to="/" className="text-4xl font-bold text-black hover:text-blue-900 transition-all">
//               MediTrack
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-6">
//             {navLinks.map((item, i) => (
//               <Link
//                 to={item.path}
//                 key={i}
//                 className="text-lg font-medium text-black hover:text-blue-900 transition-all duration-300"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Buttons */}
//           <div className="hidden lg:flex items-center space-x-4">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-6 py-2 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-6 py-2 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <Link
//                 to="/profile"
//                 className="px-6 py-2 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//               >
//                 Profile
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <button
//               className="text-4xl text-black"
//               onClick={() => setMobileNav(true)}
//             >
//               <IoReorderThreeOutline />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div className={`fixed inset-0 bg-blue-200 z-50 flex flex-col items-center justify-center transform transition-transform ${MobileNav ? "translate-x-0" : "translate-x-full"}`}>
//           {/* Close Button */}
//           <div className="absolute top-6 right-6 text-4xl text-black">
//             <button onClick={() => setMobileNav(false)}>
//               <RxCross2 />
//             </button>
//           </div>

//           {/* Mobile Links */}
//           <div className="flex flex-col items-center space-y-8 text-3xl">
//             {navLinks.map((item, i) => (
//               <Link
//                 to={item.path}
//                 key={i}
//                 className="text-black hover:text-blue-900 transition-all duration-300"
//                 onClick={() => setMobileNav(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}

//             {/* Mobile Login / Signup */}
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-6 py-3 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                   onClick={() => setMobileNav(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-6 py-3 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                   onClick={() => setMobileNav(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <Link
//                 to="/profile"
//                 className="px-6 py-3 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                 onClick={() => setMobileNav(false)}
//               >
//                 Profile
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;


// 2nd --version--

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { IoReorderThreeOutline } from "react-icons/io5";
// import { RxCross2 } from "react-icons/rx";
// import { useDispatch, useSelector } from 'react-redux';

// const Navbar = () => {
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const [MobileNav, setMobileNav] = useState(false);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "DoctorVisit", path: "/get-all-doctor-visit" },
//     { name: "TestReport", path: "/get-all-test-report" },
//     { name: "RegularCheckUp", path: "/get-all-regular-checkup" },
//     { name: "Add Member", path: "/add-member" }
//   ];

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//         await axios.get("http://localhost:2001/api/v1/logout", { withCredentials: true });
//         dispatch(authActions.logout());
//         navigate("/login");
//     };

//   return (
//     <>
//       <nav className="px-6 md:px-12 py-4 bg-blue-300 shadow-lg">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-4">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/11411/11411445.png"
//               className="h-12"
//               alt="MediTrack"
//             />
//             <Link to="/" className="text-4xl font-bold text-black hover:text-blue-900 transition-all">
//               MediTrack
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-6">
//             {navLinks.map((item, i) => (
//               <Link
//                 to={item.path}
//                 key={i}
//                 className="text-lg font-medium text-black hover:text-blue-900 transition-all duration-300"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Buttons */}
//           <div className="hidden lg:flex items-center space-x-4">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-6 py-2 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-6 py-2 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/profile"
//                   className="px-6 py-2 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                 >
//                   Profile
//                 </Link>
//                 {/* <Link
//                   to="/logout"
//                   className="px-6 py-2 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                 >
//                   Logout
//                 </Link> */}

//                  <div className="mt-4 md:mt-0">
//                         <button 
//                             onClick={handleLogout} 
//                             className="px-6 py-3 bg-white text-teal-900 font-semibold rounded-lg shadow-md hover:bg-teal-700 hover:text-white transition-all duration-300"
//                         >
//                             Log Out
//                         </button>
//                   </div>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <button
//               className="text-4xl text-black"
//               onClick={() => setMobileNav(true)}
//             >
//               <IoReorderThreeOutline />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div className={`fixed inset-0 bg-blue-200 z-50 flex flex-col items-center justify-center transform transition-transform ${MobileNav ? "translate-x-0" : "translate-x-full"}`}>
//           {/* Close Button */}
//           <div className="absolute top-6 right-6 text-4xl text-black">
//             <button onClick={() => setMobileNav(false)}>
//               <RxCross2 />
//             </button>
//           </div>

//           {/* Mobile Links */}
//           <div className="flex flex-col items-center space-y-8 text-3xl">
//             {navLinks.map((item, i) => (
//               <Link
//                 to={item.path}
//                 key={i}
//                 className="text-black hover:text-blue-900 transition-all duration-300"
//                 onClick={() => setMobileNav(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}

//             {/* Mobile Auth Buttons */}
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-6 py-3 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                   onClick={() => setMobileNav(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-6 py-3 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                   onClick={() => setMobileNav(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/profile"
//                   className="px-6 py-3 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                   onClick={() => setMobileNav(false)}
//                 >
//                   Profile
//                 </Link>
//                 <Link
//                   to="/logout"
//                   className="px-6 py-3 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
//                   onClick={() => setMobileNav(false)}
//                 >
//                   Logout
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 
import { authActions } from '../store/auth.js'; 

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [MobileNav, setMobileNav] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "DoctorVisit", path: "/get-all-doctor-visit" },
    { name: "TestReport", path: "/get-all-test-report" },
    { name: "RegularCheckUp", path: "/get-all-regular-checkup" },
    { name: "Add Member", path: "/add-member" }
  ];

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/api/v1/logout", { withCredentials: true });
      dispatch(authActions.logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <nav className="px-6 md:px-12 py-4 bg-blue-300 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11411/11411445.png"
              className="h-12"
              alt="MediTrack"
            />
            <Link to="/" className="text-4xl font-bold text-black hover:text-blue-900 transition-all">
              MediTrack
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((item, i) => (
              <Link
                to={item.path}
                key={i}
                className="text-lg font-medium text-black hover:text-blue-900 transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="px-6 py-2 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="text-4xl text-black"
              onClick={() => setMobileNav(true)}
            >
              <IoReorderThreeOutline />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`fixed inset-0 bg-blue-200 z-50 flex flex-col items-center justify-center transform transition-transform ${MobileNav ? "translate-x-0" : "translate-x-full"}`}>
          {/* Close Button */}
          <div className="absolute top-6 right-6 text-4xl text-black">
            <button onClick={() => setMobileNav(false)}>
              <RxCross2 />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col items-center space-y-8 text-3xl">
            {navLinks.map((item, i) => (
              <Link
                to={item.path}
                key={i}
                className="text-black hover:text-blue-900 transition-all duration-300"
                onClick={() => setMobileNav(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
                  onClick={() => setMobileNav(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
                  onClick={() => setMobileNav(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="px-6 py-3 bg-white text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
                  onClick={() => setMobileNav(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileNav(false);
                  }}
                  className="px-6 py-3 border border-black text-black rounded-full hover:bg-blue-900 hover:text-white transition-all"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


