import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import DoctorVisitCard from './DoctorVisitCard.jsx';
import { useSelector } from 'react-redux';
import ErrorPage from '../ErrorPage.jsx';

const GetAllDoctorVisit = () => {

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

    if(!isLoggedIn) return <ErrorPage/>;

    const [DoctorVisit,setDoctorVisit] = useState();

    try{

        useEffect(()=>{

            const fetch = async()=>{

                const res = await axios.get("http://localhost:3001/api/v1/get-all-doctorVisit",{withCredentials:true});
                console.log(res.data.data);
                setDoctorVisit(res.data.data);
            }

            fetch();

        },[]);


    }catch(err){
        console.log(err);
    }

  return (
    <div className='h-screen'>
        <div className='w-full h-full bg-blue-50 px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
            {DoctorVisit && DoctorVisit.map((items,i)=><div key={i}><DoctorVisitCard data={items}/></div>)}
        </div>
    </div>
  )
}

export default GetAllDoctorVisit