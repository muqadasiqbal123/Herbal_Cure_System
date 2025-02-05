import React,{useContext, useState} from 'react'
import cure from '../assets/cure.png';
import { NavLink, useNavigate } from 'react-router-dom';
import profile_pic from '../assets/profile_pic.png';
import dropdown_icon from '../assets/dropdown_icon.svg'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const NavBar = () => {

      const navigate = useNavigate();

      const { token, setToken, userData} = useContext(AppContext)

      const [ showMenu, setShowMenu] = useState(false)

      const logout = () =>{
        setToken(false)
        localStorage.removeItem('token')
      }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b-gray-400'>
     <img onClick={()=>navigate('/')} className='w-44 cursor-pointer'  src={cure} alt="Cure" />    
     <ul className='hidden md:flex items-start gap-5 front-medium'>
        <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to ='/view-categories'>
            <li className='py-1'>ViewCategories</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to ='/Herbalists'>
            <li className='py-1'>Herbalists</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to ='/About'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to ='/Contact'>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

     </ul>
     <div className='flex items-center gap-4'>
        { 
        token && userData
         ? 
        <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt="Profile"/>
            <img className='w-2.5' src={dropdown_icon} alt="Dropdown Icon"/>
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
        <p onClick={()=>navigate('my-profile')}className='hover:text-black cursor-pointer'>My Profile</p>
    <p onClick={()=>navigate('my-appointments')}className='hover:text-black cursor-pointer'>My Appointment</p>
            <p onClick={logout}className='hover:text-black cursor-pointer'>Logout</p>
                </div>
            </div>
            </div>
         :<button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
        }
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* -----------Mobile Menu----------- */}
        <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-6'>
                <img className='w-36' src={cure} alt="Cure" />
                <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/ViewCategories'><p className='px-4 py-2 rounded inline-block'>ViewCategories</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/herbalists'><p className='px-4 py-2 rounded inline-block'>Herbalists</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
            </ul>
        </div>
     </div>
    </div>
  )
}

export default NavBar