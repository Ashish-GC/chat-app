import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/Message";


export async function POST(req:Request){
    dbConnect();

    try {
        const { user, message, time, roomName} =await  req.json();

        const deleteMessage = await Message.deleteOne({roomName, message,user,time});
  
        if(!deleteMessage){
            return Response.json(
                { success: false, message:"unable to delete message" },
                {
                  status: 400,
                })
        }

        return Response.json(
            { success: true, message:"message deleted successfully" },
            {
              status: 200,
            })

    } catch (error) {
        return Response.json(
            { success: false, message:"unable to delete message" },
            {
              status: 500,
            })
    }
 
   

}