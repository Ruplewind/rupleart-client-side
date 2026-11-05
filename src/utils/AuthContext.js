import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [token, setToken] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [canPostAds, setCanPostAds] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = (token, user_id, fullname, canPost = false) =>{
        setToken(token);
        setFullName(fullname);
        setUserId(user_id);
        setCanPostAds(canPost === true);
        localStorage.setItem('rpl$token', token)
        localStorage.setItem('rpl$userId', user_id)
        localStorage.setItem('rpl$fullname', fullname)
        localStorage.setItem('rpl$canPostAds', String(canPost === true))
    }

    const logout = ()=>{
        setToken(null);
        setUserId(null);
        setFullName(null);
        setCanPostAds(false);
        localStorage.removeItem('rpl$token')
        localStorage.removeItem('rpl$userId')
        localStorage.removeItem('rpl$fullname')
        localStorage.removeItem('rpl$canPostAds')
    }

    const isLoggedIn = () =>{
        let savedToken = localStorage.getItem('rpl$token');
        let userId = localStorage.getItem('rpl$userId');
        let fullname = localStorage.getItem('rpl$fullname');

        if(savedToken){
            setToken(savedToken);
            setFullName(fullname);
            setUserId(userId);
            setCanPostAds(localStorage.getItem('rpl$canPostAds') === 'true');
        }
    }

    useEffect(()=>{
        isLoggedIn();
        setLoading(false);
    },[])

    // Re-check the permission with the server whenever we have a token,
    // so a revoked (or newly granted) user is updated without logging in again
    useEffect(()=>{
        if(!token) return;
        fetch(`${process.env.REACT_APP_API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.ok ? res.json() : null)
        .then(profile => {
            if(!profile) return;
            const allowed = profile.canPostAds === true;
            setCanPostAds(allowed);
            localStorage.setItem('rpl$canPostAds', String(allowed));
        })
        .catch(() => {}) // offline: keep the cached value
    },[token])

    return (
        <AuthContext.Provider value={{login, logout, fullName, userId, token, canPostAds, loading}}>
            {children}
        </AuthContext.Provider>
    )
}