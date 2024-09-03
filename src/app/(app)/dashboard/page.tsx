"use client";

import React, { useContext } from "react";
import classes from "./dashboard.module.css";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import MyContacts from "@/components/shared/my-contacts/MyContacts";
import GlobalChat from "@/components/global-chat/GlobalChat";
import { ShowContacts } from "@/context/ContactsContext";

function page() {
         const {showContacts} = useContext(ShowContacts);
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

export default page;
