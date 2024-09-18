'use client'

import React, { createContext, useEffect, useState } from 'react'



interface WebRTCContextType {
    getOffer: () => Promise<any>; 
    getAnswer: (offer: any) => Promise<any>; 
    setRemoteDescription: (ans: any) => Promise<void>; 
  }
  
  export const webRTCContext = createContext<WebRTCContextType>({
    getOffer: async () => {
    },
    getAnswer: async (offer:any) => {
    },
    setRemoteDescription: async (ans:any) => {
    }
  });

function WebRTCProvider({children}:{children:React.ReactNode}) {

    const [peer,setPeer]=useState<RTCPeerConnection>();

      useEffect(()=>{
         setPeer(
            new RTCPeerConnection({
            iceServers:[
                {
                    urls:[
                        'stun:stun.l.google.com:19302',
                         'stun:global.stun.twilio.com:3478'
                    ] 
                }
            ]
           }) 
        )
      },[])

  
         const getOffer=async()=>{
            if(peer){
                const offer = await peer.createOffer();
                peer.setLocalDescription(new RTCSessionDescription(offer));
                   return offer;
            }
              
         }
        async function setRemoteDescription(ans:any){
            if(peer){
              await peer.setRemoteDescription(new RTCSessionDescription(ans))
            }
         }
        async function getAnswer(offer:any){
                    if(peer){
                      await  peer.setRemoteDescription(new RTCSessionDescription(offer));
    
                      const answer = await peer.createAnswer();
    
                      await peer.setLocalDescription(new RTCSessionDescription(answer));
                        
                      return answer;
                    }
         }    

      
       

      
  return (
    <webRTCContext.Provider value={{getOffer , getAnswer , setRemoteDescription}}>
        {children}
    </webRTCContext.Provider>
  )
}

export default WebRTCProvider
