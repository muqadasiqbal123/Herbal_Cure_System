import { createContext} from "react";

export const AppContext = createContext();

const AppContextProvider = (probs) => {

 const value = {
     
 }
  
 return (
    <AppContext.Provider value={value}>
        {probs.children}
    </AppContext.Provider>
 )


}

export default AppContextProvider;