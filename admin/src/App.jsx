import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddHerbalist from './pages/Admin/AddHerbalist';
import HerbalistsList from './pages/Admin/HerbalistsList';
import { AdminContext } from './context/AdminContext';


const App = () => {

 const {aToken} = useContext(AdminContext)

  return aToken ? (
    <div className='bg-[#F8F9FD]'> 
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path = '/' element={<></>} />
          <Route path = '/admin-dashboard' element={<Dashboard/>} />
          <Route path = '/all-appointment' element={<AllAppointments/>} />
          <Route path = '/add-Herbalist' element={<AddHerbalist/>} />
          <Route path = '/herbalist-list' element={<HerbalistsList/>} />
        </Routes>
      </div>
    </div>
  ):(
    <>
    < Login />
    <ToastContainer/>
    </>
  )
}

export default App