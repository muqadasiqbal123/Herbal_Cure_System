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

    const value ={
        herbalists, 
        currencysymbol,
        token, setToken, backendUrl,
     }

    useEffect(()=>{
    getHerbalistsData()
    },[])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider