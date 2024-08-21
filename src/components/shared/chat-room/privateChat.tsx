import React, { useContext, useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import classes from "./privateChat.module.css";
import { useSocket } from "@/context/SocketContext";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { formatDateTime } from "@/helpers/handleTime";



function PrivateChat({friend}:{friend:string}) {
  const { user } = useContext(UserContext);
  const { socket } = useSocket();
  const [privateRoom,setPrivateRoom]=useState({
    name:"",
    contacts:[],
    id:""
  });
  const [privateMessage, setPrivateMessage] = useState([
    { user: "", message: "" , time:new Date(), roomName:""},
  ]);

  const latestMessage:any=useRef();

  useEffect(()=>{
    latestMessage.current?.scrollIntoView({ behavior: 'smooth' });
  },[privateMessage])

  useEffect(()=>{
     async function getRoomId(){
       const response = await axios.get(`/api/my-contacts/getPrivateRoom?friend=${friend}`);
       setPrivateRoom(response.data.privateRoom) 
     }
     getRoomId().then(()=>{
      
     })
 },[])
 
 useEffect(()=>{
  if (privateRoom.name != '') {
    getMessages();
  }
 },[privateRoom?.name])

 async function getMessages(){
  const response = await axios.get(`/api/get-message?roomName=${privateRoom.name}`);
    const messages= await  response.data.messages ;
    setPrivateMessage(messages);
   
 }

   useEffect(()=>{
    if (privateRoom.name != '') {
            // connect socket 
            socket?.emit("private:Room",`${user.username} connected`);
            socket?.emit("join:Room",privateRoom);
            socket?.on("private:message", (data) => {
              
              setPrivateMessage((prev)=>{
                      if(prev[0].user!="" && prev[prev.length-1].time === data.time){
                        return [...prev];
                      }
                 return [...prev, data];
              });
            });
    }
   },[privateRoom?.name,socket?.id,user.username])

  const message = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    const userMessage = message?.current?.value || "";
    const time = new Date();
    setPrivateMessage((prev) => {
      return [...prev, { user: user.username, message: userMessage , time, roomName:privateRoom.name}];
    });
    
      // add message data to database
         async function postMessage(){
          const messageResponse = await axios.post('/api/message',{ user: user.username, message: userMessage , time, roomName:privateRoom.name})
           if(!messageResponse){
              console.log("error")
           }
        }
        postMessage();
       

     // send message to  server socket  and also store the message in message schema 

    socket?.emit("private:message", {
      user: user.username,
      message: userMessage,
      time:time,
      roomName: privateRoom.name,
    });

    if (message?.current && message?.current?.value) {
      message.current.value = "";
    }
  };

  return (
    <article className={classes.content}>
      <div className={classes.globalContent}>
        {privateMessage.map((chat, index) => {
          if (chat.user === "") {
            return <div key={index}></div>;
          }
                 const getTime = formatDateTime(chat.time.toLocaleString())
          return (
            <div
              key={index}
              ref={index===privateMessage.length-1?latestMessage:null}
              className={`${chat.user === user.username && "justify-end"}  ${
                classes.globalMessage
              }`}
            >
              <div className={classes.chatPosition}>
                <p className={classes.message}>{chat.message}</p>
                <p className={classes.timer}>{getTime.time}</p>
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

export default PrivateChat;
