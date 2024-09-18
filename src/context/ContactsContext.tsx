"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface showContactsContextType {
    showContacts: boolean;
    setShowContacts: Dispatch<SetStateAction<boolean>>;
  }
  

export const useShowContacts = createContext<showContactsContextType>({
    showContacts:false,
    setShowContacts:()=>{}
});


function ContactsProvider({children}:{children:React.ReactNode}) {
    const [showContacts,setShowContacts]=useState(false);
     
      
  return (
    <useShowContacts.Provider value={{showContacts,setShowContacts}}>
       {children}
    </useShowContacts.Provider>
  )
}

export default ContactsProvider
