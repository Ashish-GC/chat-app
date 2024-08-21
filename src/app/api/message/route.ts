import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/Message";

export async function POST(request:Request){
    dbConnect();
    try {

         const data =await request.json();

         const addMessage = await Message.create({
            roomName:data.roomName,
            message: data.message,
            user:data.user,
            time:data.time
         });

         if(!addMessage){
            return Response.json(
                { success: false, message: "unable to add message"  },
                { status: 400 }
              );
         }


         return Response.json(
            { success: true, message: "message added "  },
            { status:200 }
          );
        
    } catch (error) {
        return Response.json(
            { success: false, message: "unable to add message" , error:error },
            { status: 500 }
          );
    }
}
