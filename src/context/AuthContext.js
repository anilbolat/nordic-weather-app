import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    let initLoginData = '';
    const [loginData, dispatch] = useReducer(authReducer, initLoginData, 
        () => {
            const localData = localStorage.getItem('loginData');
            return localData ? localData : initLoginData;
        }
    );

    useEffect(() => {
      localStorage.setItem('loginData', loginData);
    }, [loginData])
    
    return (
        <AuthContext.Provider value={{ loginData, dispatch }} >
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;