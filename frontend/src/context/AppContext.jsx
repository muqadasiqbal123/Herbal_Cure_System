import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencysymbol ='$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [herbalists, setHerbalists] = useState([])
    // fetch token from local storage and use it in token state whenever we reload the page
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData, setUserData] = useState(false);

    const getHerbalistsData = async () => {

        try {

            const {data} = await axios.get(backendUrl + '/api/herbalist/list')
            if (data.success) {
                setHerbalists(data.herbalists)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const loadUserProfileData = async () =>{

        try {

            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message) 
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message) 
        }

    }
//   use these functions in any component
    const value ={
        herbalists, getHerbalistsData,
        currencysymbol,
        token, setToken, backendUrl,
        userData, setUserData,
        loadUserProfileData,
     }

    useEffect(()=>{
    getHerbalistsData()
    },[])

    useEffect(()=>{
     if (token) {
        loadUserProfileData()
     }else{
        setUserData(false)
     }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider