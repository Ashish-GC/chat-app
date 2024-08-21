"use client";

import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

import classes from "./MyContacts.module.css";
import profileImage from "../../../../public/profileImage.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import { formatDateTime } from "@/helpers/handleTime";

function MyContacts() {
  const user = useContext(UserContext);

  const router = useRouter();
  const [contacts, setContacts] = useState<
    [
      {
        username: string;
        email: string;
        profilePicture: string;
        _id: string;
        lastLogin: string;
      }
    ]
  >([
    {
      username: "",
      email: "",
      profilePicture: "",
      _id: "",
      lastLogin: "",
    },
  ]);
  const [filteredContacts, setFilteredContacts] = useState<
    [
      {
        username: string;
        email: string;
        profilePicture: string;
        _id: string;
        lastLogin: string;
      }
    ]
  >([
    {
      username: "",
      email: "",
      profilePicture: "",
      _id: "",
      lastLogin: "",
    },
  ]);

  // get all contacts
  async function getContacts() {
    const response = await axios.get("/api/user/getUserContacts");
       
    if( response.data.contacts[0] ){
      const contacts = response.data.contacts[0].friendDetails;
        setContacts(contacts);
    }
  }
  
  useEffect(() => {
    getContacts();
  }, [user]);

  const privateRoom = (username: string) => {
    router.push(`/room/${username}`);
  };

  const showUserProfile = () => {
    router.push(`/user-profile/123`);
  };

  const searchContactsHandler = (e: any) => {
    const searchTerm = e.target.value;
        console.log("here",searchTerm)
    if(searchTerm === ""){
      setFilteredContacts(contacts);
    }
    const filter: any = contacts.filter(
      (contact) => contact.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filter);
  };

  return (
    <section className={classes.contacts}>
      <nav className={classes.contactsNav}>
        <div>
          <h4>Active Users</h4>
          <BsThreeDotsVertical
            size={18}
            color="gray"
            onClick={showUserProfile}
          />
        </div>

        <ul>
          <li>
            <Image src={profileImage} alt="profile" />
          </li>
          <li>
            <Image src={profileImage} alt="profile" />
          </li>
        </ul>
      </nav>

      <section className={classes.contactsSearchBar}>
        <div>
          <CiSearch size={18} color="gray" />
          <input
            onChange={(e) => {
                searchContactsHandler(e);
            }}
            type="text"
            placeholder="Type a username"
          ></input>
        </div>
      </section>

      <article className={classes.contactsContent}>
        <h4>ALL CHATS</h4>
        <div className={classes.contactsProfile}>
          <ul>
            {filteredContacts[0]?.username != "" &&
              filteredContacts.map((friend, index) => {
                const getTime = formatDateTime(friend.lastLogin);
                return (
                  <li key={index} onClick={() => privateRoom(friend.username)}>
                    <Image src={profileImage} alt="profile"></Image>
                    <div className={classes.userContact}>
                      <div className={classes.userInfo}>
                        <p className="font-bold">{friend.username}</p>
                        <p className="text-gray-500">{getTime.time}</p>
                      </div>

                      {/* <p className='text-gray-500'>message</p> */}
                    </div>
                  </li>
                );
              })}
            {filteredContacts[0]?.username == "" && contacts[0].username !="" &&
              contacts.map((friend, index) => {
                const getTime = formatDateTime(friend.lastLogin);
                return (
                  <li key={index} onClick={() => privateRoom(friend.username)}>
                    <Image src={profileImage} alt="profile"></Image>
                    <div className={classes.userContact}>
                      <div className={classes.userInfo}>
                        <p className="font-bold">{friend.username}</p>
                        <p className="text-gray-500">{getTime.time}</p>
                      </div>

                      {/* <p className='text-gray-500'>message</p> */}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </article>
    </section>
  );
}

export default MyContacts;
