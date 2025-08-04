import { createContext, useEffect, useReducer, useState } from "react";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    let initLoginData = '';

    const [email, setEmail] = useState('');

    const [loginData, dispatch] = useReducer(authReducer, initLoginData, 
        () => {
            const localData = localStorage.getItem('loginData');
            return localData ? localData : initLoginData;
        }
    );

    useEffect(() => {
      localStorage.setItem('loginData', loginData);
    }, [loginData])

    const value = {
        email,
        setEmail,
        loginData,
        dispatch
    };
    
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;