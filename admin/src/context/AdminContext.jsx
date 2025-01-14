import axios from "axios";
import { createContext} from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (probs) => {

   const [ aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
   const [ herbalists, setHerbalists] = useState([]); 
   const [ appointments, setAppointments] = useState([])
   const [dashData, setDashData] = useState(false)   //call api /dashboard save data in state variable

   const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

   const getAllHerbalists = async () => {
       
   try {
      
      const {data} = await axios.post(backendUrl + '/api/admin/all-herbalists', {} , {headers: {aToken}})
    if (data.success) {
      setHerbalists(data.herbalists)
      console.log(data.herbalists);
    }else{
      toast.error(data.message)
    }
   } catch (error) {
      toast.error(error.message)
   }

   }

   const changeAvailability = async (herbId) =>{

      try {

    const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {herbId},{headers:{aToken}})
    if (data.success) {
      toast.success(data.message)
      getAllHerbalists()
    }else{
      toast.error(data.message)
    }
         
      } catch (error) {
         toast.error(error.message)
      }

   }

  //  arrow function to get all appointment 
  const getAllAppointments = async () => {
    try {
      
      const { data } = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})
      if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments);
        
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      
      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId}, {headers:{aToken}})
      if (data.success) {
        toast.success(data.message)
        getAllAppointments()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  } 

  const getDashData = async () => {
    try {
      
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
      if (data.success) {
        setDashData(data.dashData)
        console.log(data.dashData);
        
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

 const value = {
    aToken, setAToken,
    backendUrl, herbalists, 
    getAllHerbalists, changeAvailability, 
    appointments, setAppointments, 
    getAllAppointments, 
    cancelAppointment,
    dashData, getDashData
 }
  
 return (
    <AdminContext.Provider value={value}>
        {probs.children}
    </AdminContext.Provider>
 )


}

export default AdminContextProvider;