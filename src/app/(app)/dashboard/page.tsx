"use client";

import React, { useContext } from "react";
import classes from "./dashboard.module.css";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import MyContacts from "@/components/shared/my-contacts/MyContacts";
import GlobalChat from "@/components/global-chat/GlobalChat";
import { useShowContacts } from "@/context/ContactsContext";

function Page() {
         const {showContacts} = useContext(useShowContacts);
  return (
    <section className={classes.container}>
      {showContacts && <MyContacts/> } 
       
      {/* global chat room */}
      <section className={classes.global}>
        <nav className={classes.globalNav}>
          <ul>
            <li>
              <BsGlobeCentralSouthAsia size={25} color="gray" />
            </li>
            <li>
              <h4>Global Chat</h4>
            </li>
          </ul>
        </nav>

         <GlobalChat/>
      </section>
    </section>
  );
}

export default Page;
