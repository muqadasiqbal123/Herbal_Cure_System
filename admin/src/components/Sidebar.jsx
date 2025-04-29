import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { HerbalistContext } from '../context/HerbalistContext'
import chat_icons from '../assets/chat_icons.png'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(HerbalistContext)

  return (
    <div className='min-h-screen bg-white border-r ' >
       {
        aToken && <ul className='text-[#515151] mt-5' >

      <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin-dashboard'} >
        <img src={assets.home_icon} alt="Home Icon" />
        <p className='hidden md:block' >Dashboard</p>
      </NavLink>

      <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-appointment'} >
        <img src={assets.appointment_icon} alt="Appointment Icon" />
        <p className='hidden md:block' >Appointments</p>
      </NavLink>

      <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-Herbalist'} >
        <img src={assets.add_icon} alt="Add Icon" />
        <p className='hidden md:block' >Add Herbalists</p>
      </NavLink>

      <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/herbalist-list'} >
        <img src={assets.people_icon} alt="People Icon" />
        <p className='hidden md:block' >Herbalists List</p>
      </NavLink>

      <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin-chats'} >
      <img className='w-6 h-6' src={chat_icons}  alt="Chat Icon" />
        <p className='hidden md:block' >Chats</p>
      </NavLink>

        </ul>
       }

       {
        dToken && <ul className='text-[#515151] mt-5' >

      <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/herbalist-dashboard'} >
        <img src={assets.home_icon} alt="Home Icon" />
        <p className='hidden md:block' >Dashboard</p>
      </NavLink>

      <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/herbalist-appointments'} >
        <img src={assets.appointment_icon} alt="Appointment Icon" />
        <p className='hidden md:block' >Appointments</p>
      </NavLink>

      <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/herbalist-profile'} >
        <img src={assets.people_icon} alt="People Icon" />
        <p className='hidden md:block' >Profile</p>
      </NavLink>

      <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/herbalist-chats'} >
        <img className='w-6 h-6' src={chat_icons}  alt="Chat Icon" />
        <p className='hidden md:block' >Chats</p>
      </NavLink>

        </ul>
       }

    </div>
  )
}

export default Sidebar