import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TestReportCard from './TestReportCard';
import ErrorPage from '../ErrorPage.jsx';
import { useSelector } from 'react-redux';

const GetAllTestReport = () => {

  const [Data,setData] = useState();

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
 
  try {

    useEffect(()=>{

      const fetch = async()=>{
        const res = await axios.get("http://localhost:3001/api/v1/get-all-test-report",{withCredentials:true});
        console.log(res.data.data);
        setData(res.data.data);
      };

      fetch();
    },[])
    
  } catch (error) {
    console.log(error);
  }

  if(!isLoggedIn) return <ErrorPage/>;

  return (
    <div className='h-screen'>
      
      <div className='w-full h-full bg-blue-50 px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
        {Data && Data.map((items,i)=><div key={i}> <TestReportCard data={items}/> </div>)}
      </div>
    </div>
  )
}

export default GetAllTestReport