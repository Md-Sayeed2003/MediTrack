import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../component/Navbar.jsx'
import Footer from '../component/Footer.jsx'

const MainLayout = () => {
  return (
    <div className='relative'>
        <Navbar/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout