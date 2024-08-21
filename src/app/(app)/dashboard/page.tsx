"use client";

import React from "react";
import classes from "./dashboard.module.css";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import MyContacts from "@/components/shared/my-contacts/MyContacts";
import GlobalChat from "@/components/global-chat/GlobalChat";

function page() {

  return (
    <section className={classes.container}>
      {/* global chat room */}
      <section className={classes.global}>
        <nav className={classes.globalNav}>
          <ul>
            <li>
              <BsGlobeCentralSouthAsia size={20} color="gray" />
            </li>
            <li>
              <h4>Global Chat</h4>
            </li>
          </ul>
        </nav>

         <GlobalChat/>
      </section>

      {/* my contacts */}
      <MyContacts/>
    </section>
  );
}

export default page;
