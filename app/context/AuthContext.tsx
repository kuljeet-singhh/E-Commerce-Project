"use client"


import { getUser, User } from "../utils/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext =createContext<AuthContextType | null >(null);

export function AuthProvider({
    children,
}:{ children: React.ReactNode;

}) {
    const [user ,setUser]=useState<User | null>(null);
    //lode user from localstorage on first mount 

    useEffect(()=>{
        const storedUser= getUser();
        setUser(storedUser);
    },[]);

      return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};