import React, { useContext, useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import classes from "./globalChat.module.css";
import { useSocket } from "@/context/SocketContext";
import { UserContext } from "@/context/UserContext";
import { SiTicktick } from "react-icons/si";
import { RiAddCircleLine } from "react-icons/ri";
import axios from "axios";

function GlobalChat() {
  const { user } = useContext(UserContext);
  const { socket } = useSocket();

  const [globalMessage, setGlobalMessage] = useState([
    { user: "", message: "" },
  ]);

  const message = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket?.emit("connect:user", `${user.username}`);

    socket?.on("global:message", (data) => {
      setGlobalMessage((prev) => {
        return [...prev, data];
      });
    });
  }, [user.username, socket?.id]);

  const sendMessage = () => {
    const userMessage = message?.current?.value || "";
  
    setGlobalMessage((prev) => {
      return [...prev, { user: user.username, message: userMessage }];
    });

    socket?.emit("global:message", {
      user: user.username,
      message: userMessage,
    });

    if (message?.current && message?.current?.value) {
      message.current.value = "";
    }
  };

  // Add to contacts

  const addToContacts = async (friend: string) => {
    // console.log("here")
     const response = await axios.post('/api/user/addToFriend',{friend})
    //  const response = await axios.post('/api/user/removeFromFriend',{friend})
  };

  return (
    <article className={classes.content}>
      <div className={classes.globalContent}>
        {globalMessage.map((chat, index) => {
          if (chat.user === "") {
            return <div key={index}></div>;
          }

          return (
            <div
              key={index}
              className={`${chat.user === user.username && "justify-end"}  ${
                classes.globalMessage
              }`}
            >
              <div className={classes.chatPosition}>
                <div>
                  <div className="flex gap-1 justify-center items-center">
                    <p className={classes.username}>{chat.user}</p>
                    {  (user.username != chat.user) &&
                    (
                      //check if friend or not
                      user.friends.some(
                        (friend: string) => friend===chat.user
                      ) ? (
                        <SiTicktick  onClick={() => addToContacts(chat.user)} color={"blue"} size={12} />
                      ) : (
                        <RiAddCircleLine
                          onClick={() => addToContacts(chat.user)}
                          className="cursor-pointer"
                          color={"black"}
                          size={14}
                        />
                      )
                    )
                    }
                 
                  </div>
                  {/* <p className="timer"></p> */}
                </div>
                <p className={classes.message}>{chat.message}</p>
              </div>
            </div>
          );
        })}
      </div>

      <footer className={classes.globalSearchBar}>
        <div>
          <BsEmojiSmile size={20} color="gray" />
          <input
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
            ref={message}
            type="text"
            placeholder="Type a message"
          ></input>
        </div>

        <IoSend size={23} color="gray" onClick={sendMessage} />
      </footer>
    </article>
  );
}

export default GlobalChat;
