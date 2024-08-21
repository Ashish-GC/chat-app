
import { Server } from "socket.io";

export const socketHandler=(httpServer)=>{
    const io = new Server(httpServer,
        {
            cors:{
                origin: "http://localhost:3000/"
              }
        }
       
    );

    io.on("connection", (socket) => {
         socket.on("connect:user",(data)=>{
            console.log(data," connected ")
         })
         socket.on("global:message",(message)=>{
                 socket.broadcast.emit("global:message",message)
         })

         socket.on("disconnect",()=>{console.log("user disconnected",socket.id)})

         socket.on("private:Room",(message)=>{
            // console.log(message);
            socket.on("join:Room",(privateRoom)=>{
                     socket.join(privateRoom.name);
            })

            socket.on("private:message",(data)=>{
                socket.to(data.roomName).emit("private:message",data);
            })
         })
         
    }); 

}