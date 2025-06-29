import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RegularCheckupCard from './RegularCheckupCard.jsx';
import { useSelector } from 'react-redux';
import ErrorPage from '../ErrorPage.jsx';

const GetAllRegularCheckup = () => {

  const [Data,setData] = useState();

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);

  try{

    useEffect(()=>{

      const fetch = async()=>{
        const res = await axios.get("http://localhost:3001/api/v1/get-all-regular-checkup",{withCredentials : true});
        console.log(res.data.data);
        setData(res.data.data);
      }

      fetch();
    },[])

  }catch(err){
    console.log(err);
  }

  if(!isLoggedIn) return <ErrorPage/>;

  

  return (
    <div className='h-screen'>
      <div className='w-full h-full bg-blue-50 px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
        {Data && Data.map((items,i)=><div key={i}><RegularCheckupCard data={items}/></div>)}
      </div>
    </div>
  )
}

export default GetAllRegularCheckup