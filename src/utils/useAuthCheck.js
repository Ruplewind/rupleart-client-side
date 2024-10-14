import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';

const useAuthCheck = () => {
  const { token, logout } = useContext(AuthContext);
  const history = useNavigate();

  const isTokenExpired = (token) => {
    if(!token) return true;

    const { exp } = jwtDecode(token);
    return exp * 1000 < Date.now();
  }

  useEffect(() => {
    const interval = setInterval(()=>{
        if (isTokenExpired(token)) {
            logout();
        }
    }, 1000 * 10)

    return () => clearInterval(interval);
    
  }, [token, logout, history]);
};

export default useAuthCheck;