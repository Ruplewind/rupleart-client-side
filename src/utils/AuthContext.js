import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [token, setToken] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);


    const login = (token, user_id, fullname) =>{
        setToken(token);
        setFullName(fullname);
        setUserId(user_id);
        localStorage.setItem('rpl$token', token)
        localStorage.setItem('rpl$userId', user_id)
        localStorage.setItem('rpl$fullname', fullname)
    }

    const logout = (user)=>{
        setToken(null);
        setUserId(null);
        setFullName(null);
        localStorage.removeItem('rpl$token')
        localStorage.removeItem('rpl$userId')
        localStorage.removeItem('rpl$fullname')
    }

    const isLoggedIn = () =>{
        let savedToken = localStorage.getItem('rpl$token');
        let userId = localStorage.getItem('rpl$userId');
        let fullname = localStorage.getItem('rpl$fullname');

        if(savedToken){
            setToken(savedToken);
            setFullName(fullname);
            setUserId(userId);
        }
    }

    useEffect(()=>{
        isLoggedIn();
        setLoading(false);
    },[])

    return (<AuthContext.Provider  value={{login, logout, fullName, userId, token, loading}}>{children}</AuthContext.Provider>)
}