"use client";

import React, { useEffect, useState } from "react";
import classes from "./privateRoom.module.css";
import MyContacts from "@/components/shared/my-contacts/MyContacts";
import Image from "next/image";
import profileImage from "../../../../../public/profileImage.png";
import { IoMdClose } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import PrivateChat from "@/components/shared/chat-room/privateChat";
import axios from "axios";



function page({params}:{params:{userId:string}}) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [contactInfo,setContactInfo]=useState<any>({});


  const friend = params.userId;
  // get friends contact information
  useEffect(()=>{
     async function getFriendsInfo(){
      const response = await axios.get(`/api/my-contacts/getFriend?friend=${friend}`);
      setContactInfo(response.data.friendContactInfo) 
     }
      getFriendsInfo();
  },[])

  const openContactInfo = () => {
    setShowContactInfo(true);
  };

  return (
    <section className={classes.container}>
      
      {/* contacts */}
        <MyContacts />

      {/* private chat room */}

      <section className={classes.chatRoom}>
        <nav className={classes.chatRoomNav}>
          <ul>
            <li onClick={openContactInfo}>
              <Image src={profileImage} alt="profileImage" />
              <div>
                <h4>{contactInfo.username}</h4>
                <p>status</p>
              </div>
            </li>
            <li>
              <FaVideo size={20} color="gray" />
            </li>
          </ul>
        </nav>
       <PrivateChat friend={friend}/>
      </section>

      {/* contactInfo */}
      {showContactInfo && (
        <section className={classes.contactInfo}>
          <nav className={classes.contactInfoNav}>
            <ul>
              <li>
                <IoMdClose color="gray" size={18} onClick={()=>setShowContactInfo(false)}/>
                <p className="font-bold">Contact info</p>
                <p className="font-bold">{contactInfo.username}</p>
                <p className="font-bold">{contactInfo.email}</p>
                <p className="font-bold">{contactInfo.lastLogin}</p>
              </li>
            </ul>
          </nav>

          <article className={classes.contactInfoContent}></article>
        </section>
      )}

    </section>
  );
}

export default page;
