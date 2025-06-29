import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'

import MainLayout from './layout/MainLayout.jsx'
import AuthLayout from './layout/AuthLayout.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import ViewMember from './pages/Member/ViewMember.jsx'
import AddMember from './pages/Member/AddMember.jsx'
import MemberDetails from './pages/Member/MemberDetails.jsx'
import AddDoctorVisit from './pages/DoctorVisit/AddDoctorVisit.jsx'
import DoctorVisitDetails from './pages/DoctorVisit/DoctorVisitDetails.jsx'
import AddTestReport from './pages/TestReport/AddTestReport.jsx'
import TestReportDetails from './pages/TestReport/TestReportDetails.jsx'
import AddRegularCheckUp from './pages/RegularCheckup/AddRegularCheckUp.jsx'
import RegularCheckupDetails from './pages/RegularCheckup/RegularCheckupDetails.jsx'
import GetAllDoctorVisit from './pages/DoctorVisit/GetAllDoctorVisit.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { authActions } from './store/auth.js'
import GetAllRegularCheckup from './pages/RegularCheckup/GetAllRegularCheckup.jsx'
import GetAllTestReport from './pages/TestReport/GetAllTestReport.jsx'
import Logout from './pages/Logout.jsx'
import LearnMore from './pages/LearnMore.jsx'
import axios from 'axios'

function App() {

  const [loginState,setLoginState] = useState(false);

  const dispatch = useDispatch();

  useEffect(()=>{

    const fetch = async()=>{

      try{

      const res = await axios.get("http://localhost:3001/api/v1/check-cookie",{withCredentials:true})

        setLoginState(res.data.message);
      }catch(err){
        console.log(err);
      }
    };

    fetch();


  },[]);

  useEffect(()=>{
    if(loginState === true){
      dispatch(authActions.login());
    }
  },[loginState,dispatch])
  

  return (
   <div>

    <Router>

      <Routes>

        <Route path='/' element={<MainLayout/>}>

            <Route index element = {<Home/>} /> 
            <Route path='/profile' element={<Profile/>} />
            <Route path='/logout' element={<Logout/>} />
            <Route path='/learn-more' element={<LearnMore/>}/>


            <Route path='/view-member' element={<ViewMember/>}/>
            <Route path='/add-member' element={<AddMember/>} />
            <Route path='/get-member-details/:id' element={<MemberDetails/>}/>

            <Route path='/add-doctor-visit/:memberId' element={<AddDoctorVisit/>} />
            <Route path='/get-doctor-visit/:id' element={<DoctorVisitDetails/>} />
            <Route path='/get-all-doctor-visit'element={<GetAllDoctorVisit/>} />

            <Route path='/add-test-report/:memberId' element={<AddTestReport/>} />
            <Route path='/get-test-report/:id' element={<TestReportDetails/>} />
            <Route path='/get-all-test-report' element={<GetAllTestReport/>} />


            <Route path='/add-regular-checkup/:memberId' element={<AddRegularCheckUp/>} />
            <Route path='/get-regular-checkup/:id' element={<RegularCheckupDetails/>} />
            <Route path='/get-all-regular-checkup' element={<GetAllRegularCheckup/>} />

        </Route>

        <Route path='/' element={<AuthLayout/>}>
           <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<SignUp/>}/>
        </Route>

      </Routes>

    </Router>

   </div>
  )
}

export default App
