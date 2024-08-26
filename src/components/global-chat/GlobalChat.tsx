import React, { useContext, useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import classes from "./globalChat.module.css";
import { useSocket } from "@/context/SocketContext";
import { UserContext } from "@/context/UserContext";
import { SiTicktick } from "react-icons/si";
import { RiAddCircleLine } from "react-icons/ri";
import axios from "axios";
import { formatDateTime } from "@/helpers/handleTime";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { OpenEmoji } from "../shared/emojiPicker/OpenEmoji";


function GlobalChat() {
  const { user,setUser } = useContext(UserContext);
  const { socket } = useSocket();
  const {toast} = useToast();
  const [message,setMessage]=useState("");

  const  recentMessage:any = useRef();

  const [globalMessage, setGlobalMessage] = useState([
    { user: "", message: "",time:new Date() },
  ]);

  // listen to every change ->
  const onMessageChangeHandler=(e:any)=>{
       setMessage(e.target.value);
  }
  // const message = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    recentMessage.current?.scrollIntoView({ behavior: 'smooth' });
  },[globalMessage])

  useEffect(() => {
    socket?.emit("connect:user", `${user.username}`);

    socket?.on("global:message", (data) => {
      setGlobalMessage((prev) => {
        if(prev[prev.length-1].time === data.time && prev[prev.length-1].user === data.user){
          return [...prev]
        }
        return [...prev, data];
      });
    });
  }, [user.username, socket?.id]);

  const sendMessage = () => {
    const userMessage = message ;
    const time = new Date();
    setGlobalMessage((prev) => {
      
      return [...prev, { user: user.username, message: userMessage ,time:time}];
    });

    socket?.emit("global:message", {
      user: user.username,
      message: userMessage,
      time:time
    });

    setMessage("");
  };

  // Add to contacts

  const addToContacts = async (friend: string) => {
       try{
        const response = await axios.post('/api/user/addToFriend',{friend})
        setUser({
          ...user,
          friends: [...user.friends, friend],
        })
  
        if(response){
          console.log("added to friend list ")
          socket?.emit("update:contacts");
        }
       }
    catch(err){
      toast({
        variant: "destructive",
        description:"unable to add to contacts",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => window.location.reload()}
          >
            Try again
          </ToastAction>
        ),
      });
    }
    //  const response = await axios.post('/api/user/removeFromFriend',{friend})

  };

  socket?.on("updated:contacts",()=>{
    console.log("listening on updated contacts")
    const getCurrentUser = async ()=>{
      const getUser= await axios.get('/api/user/getCurrentUser') ;
      // const user = getUser.data.data;
      //  user.lastLogin= new Date();
           setUser(getUser.data.data);
      }
    getCurrentUser();
  })

  //add emoji to message
  const addEmojiHandler=(emoji:string)=>{
     setMessage((prev)=>{
      return prev+emoji
     })
  }


  return (
    <article className={classes.content}>
      <div className={classes.globalContent}>
        {globalMessage.map((chat, index) => {
          if (chat.user === "") {
            return <div key={index}></div>;
          }
              const getTime = formatDateTime(chat.time.toLocaleString())
          return (
            <div
              key={index}
              ref={ index===globalMessage.length-1? recentMessage : null }
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
                  <p className={classes.timer}>{getTime.time}</p>
                </div>
                <p className={classes.message}>{chat.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    
      <footer className={classes.globalSearchBar}>
        <div> 
           <OpenEmoji getEmoji={addEmojiHandler}/>
          <input
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
             onChange={onMessageChangeHandler}
            type="text"
            value={message}
            placeholder="Type a message"
          ></input>
        </div>

        <IoSend size={23} color="gray" onClick={sendMessage} />
      </footer>
    </article>
  );
}

export default GlobalChat;
