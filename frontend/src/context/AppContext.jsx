import { createContext } from "react";
import { Herbalists } from "../assets/assets.js";
export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencysymbol ='$'
    
    const value ={
       Herbalists, 
       currencysymbol
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider