'use client'

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import classes from './VideoChat.module.css'
import ReactPlayer from 'react-player'
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useSocket } from '@/context/SocketContext';
import { ToastAction } from '@/components/ui/toast';
import { UserContext } from '@/context/UserContext';
import { webRTCContext } from '@/context/WebRTCContext';

function VideoChat({friend}:{friend:string}) {

   const {user} = useContext(UserContext);
   const [localStream,setLocalStream] = useState<MediaStream>();
   const [remoteStream,setRemoteStream] = useState<MediaStream>();
   const [privateRoom,setPrivateRoom]=useState({
    name:"",
    contacts:[],
    id:""
  });
  const  {toast} = useToast()
  const { socket } = useSocket();
  const {getOffer,getAnswer,setRemoteDescription} = useContext(webRTCContext)

   const localPlayer = useRef<any>();
   const remotePlayer = useRef<any>();

       async function openStream(){
            const stream =await navigator.mediaDevices.getUserMedia(
              {video: true, audio: true}
            )
            setLocalStream(stream)
       }
       async function closeStream(){
   
          localStream?.getTracks().forEach(track => track.stop());
          remoteStream?.getTracks().forEach(track=>track.stop())
  
        setLocalStream(undefined);
       }

     // get private room
      async function getRoomId(){
       try {
         const response = await axios.get(`/api/my-contacts/getPrivateRoom?friend=${friend}`);
         setPrivateRoom({
          id:response.data.privateRoom._id,
          name:response.data.privateRoom.name,
          contacts:response.data.privateRoom.contacts
         }) 
       } catch (error) {
         toast({
           variant: "destructive",
           description: "unable to get private room"
         })
       }
      
      }
      


     // join room 

     useEffect(()=>{
      try {
        if (privateRoom.name != '') {
          // connect socket 
        
          socket?.emit("private:Room",`${user.username} connected`);
          socket?.emit("join:Room",privateRoom);
  } 
      } catch (error) {
        toast({
          variant: "destructive",
          description:"Network Error",
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
    
     },[privateRoom?.name,socket?.id,user.username])
    
    // calling user 

  const handleCallUser = useCallback( async ()=>{
    await getRoomId()
    openStream();
        try {
          if(privateRoom.name){
            const offer = await getOffer();
              socket?.emit('call:user',offer)
       }
        } catch (error) {
           console.log(error,"here error")
        }
   

  },[socket]
)
   


 socket?.on("connect_error", (err) => {
  toast({
    variant: "destructive",
    description:"Network Error",
    action: (
      <ToastAction
        altText="Try again"
        onClick={() => window.location.reload()}
      >
        Try again
      </ToastAction>
    ),
  });
});


  return (
    <section className={classes.content}>
             {
        !localStream &&
        <section>
                 <button onClick={handleCallUser}>Call</button>
        </section> 
       } 

      {
        localStream && 
        <section className={classes.videoPlayer}>
           <div className={classes.localPlayer}>
              local stream
              <ReactPlayer ref={localPlayer} muted playing={true} url={localStream} width="300px" height="auto" />
          </div>
          {
        remoteStream &&
          <div className={classes.remotePlayer}>
            remote stream
               <ReactPlayer ref={remotePlayer} muted playing={true} url={localStream} width="300px" height="auto" />
          </div>
         }
        </section> 
}

       {
        localStream && <button className={classes.closeStream} onClick={closeStream}>Close Stream</button>
       }
    </section>
  )
}

export default VideoChat
