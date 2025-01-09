import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencysymbol ='$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [herbalists, setHerbalists] = useState([])
    
    const value ={
       herbalists, 
       currencysymbol,
    }

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