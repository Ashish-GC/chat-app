"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ShowContactsContextType {
    showContacts: boolean;
    setShowContacts: Dispatch<SetStateAction<boolean>>;
  }
  

export const ShowContacts = createContext<ShowContactsContextType>({
    showContacts:false,
    setShowContacts:()=>{}
});


function ContactsProvider({children}:{children:React.ReactNode}) {
    const [showContacts,setShowContacts]=useState(false);
     
      
  return (
    <ShowContacts.Provider value={{showContacts,setShowContacts}}>
       {children}
    </ShowContacts.Provider>
  )
}

export default ContactsProvider
