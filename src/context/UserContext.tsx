'use client'

import { userContextType, userType } from "@/types/User";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const initialUser={ 
    id:'',
    username: '',
    email:'',
    profilePicture:'',
    friends:[],
    lastLogin:new Date()
}

const initialContext:userContextType={
    user:initialUser,
    setUser:()=>{}
}

export const UserContext= createContext(initialContext)



export const ContextProvider=({children}:{children:React.ReactNode})=>{
 
     const [user,setUser]= useState<userType>(initialUser);

     const getCurrentUser = async ()=>{
        const getUser= await axios.get('/api/user/getCurrentUser') ;
             setUser(getUser.data.data);
        }
        useEffect(()=>{
           getCurrentUser();   
        },[])
 
    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
}