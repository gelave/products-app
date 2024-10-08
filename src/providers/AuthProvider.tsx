import axiosInstance from '../api/client'
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextProps = {
  token: string | null, 
  setToken: (newToken: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({token: null, setToken: (newToken: string | null) => { console.log(newToken)}});

const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  
  const [token, setToken_] = useState(localStorage.getItem("token"));

  
  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;