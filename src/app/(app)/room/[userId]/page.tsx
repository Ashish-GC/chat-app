"use client";

import React, { useContext, useEffect, useState } from "react";
import classes from "./privateRoom.module.css";
import Image from "next/image";
import profileImage from "../../../../../public/profileImage.png";
import { IoMdClose } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import PrivateChat from "@/components/shared/chat-room/privateChat";
import axios from "axios";
import MyContacts from "@/components/shared/my-contacts/MyContacts";
import { ShowContacts } from "@/context/ContactsContext";
import VideoChat from "@/components/shared/videoChat/VideoChat";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { UserContext } from "@/context/UserContext";



function page({params}:{params:{userId:string}}) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [contactInfo,setContactInfo]=useState<any>({});
  const {showContacts} = useContext(ShowContacts);

  const [screen,setScreen] =useState("chat");

  const friend = params.userId;
  // get friends contact information
  useEffect(()=>{
     async function getFriendsInfo(){
      const response = await axios.get(`/api/my-contacts/getFriend?friend=${friend}`);
      setContactInfo(response.data.friendContactInfo) 
     }
      getFriendsInfo();
  },[])


  return (
    <section className={classes.container}>
      {showContacts && <MyContacts/> } 

      {/* private chat room */}

      <section className={classes.chatRoom}>
        <nav className={classes.chatRoomNav}>
          <ul>
            <li onClick={()=>setShowContactInfo((prev)=>{
              console.log(prev)
             return !prev;
            })}>
              <Image className="rounded-full" width={500} height={500} src={contactInfo.profilePicture||profileImage} alt="profileImage" />
              <div>
                <h4>{contactInfo.username}</h4>
                <p>status</p>
              </div>
            </li>
            <li>
              {screen === "chat" && <FaVideo onClick={()=>setScreen("video")} size={20} color="gray" /> }
              {screen === "video" && <IoChatbubbleEllipsesSharp  onClick={()=>setScreen("chat")} size={20} color="gray" />}
            </li>
          </ul>
        </nav>
        {screen === "chat" &&   <PrivateChat friend={friend}/>}
        {screen === "video" && <VideoChat friend={friend}/>}
     
      </section>

      {/* contactInfo */}
      {showContactInfo && (
        <section className={classes.contactInfo}>
          <nav className={classes.contactInfoNav}>
                <h2>Contact info</h2>
                <IoMdClose className="cursor-pointer" color="white" size={18} onClick={()=>setShowContactInfo(false)}/>
          </nav>
             
          <article className={classes.contactInfoContent}>
            <Image className="rounded-full" width={500} height={500} src={contactInfo.profilePicture||profileImage} alt="profileImage"></Image>
            <ul>
                <li>username : {contactInfo.username}</li>
                <li>email : {contactInfo.email}</li>
                <li>description : {contactInfo.description}</li>
            </ul>
            </article>
        </section>
      )}

    </section>
  );
}

export default page;
