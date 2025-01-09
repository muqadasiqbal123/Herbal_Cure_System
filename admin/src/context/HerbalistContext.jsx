import { createContext} from "react";

export const HerbalistContext = createContext();

const HerbalistContextProvider = (probs) => {

 const value = {
     
 }
  
 return (
    <HerbalistContext.Provider value={value}>
        {probs.children}
    </HerbalistContext.Provider>
 )


}

export default HerbalistContextProvider;