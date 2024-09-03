'use client'

import { userContextType, userType } from "@/types/User";
import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const initialUser={ 
    id:'',
    username: '',
    email:'',
    profilePicture:'',
    description:'',
    friends:[],
    lastLogin:new Date()
}

const initialContext:userContextType={
    user:initialUser,
    setUser:()=>{},
}

export const UserContext= createContext(initialContext)



export const ContextProvider=({children}:{children:React.ReactNode})=>{
 
     const [user,setUser]= useState<userType>(initialUser);

      const getCurrentUser = async ()=>{
        const getUser= await axios.get('/api/user/getCurrentUser') ;
        // const user = getUser.data.data;
        //  user.lastLogin= new Date();
        const user = getUser.data.data
      
             setUser(user);
        }

        useEffect(()=>{
           getCurrentUser();   
        },[])

        const contextValue = useMemo(() => ({ user, setUser }), [user]);
 
    return <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>
}