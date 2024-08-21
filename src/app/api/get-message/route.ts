import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/Message";

export async function GET(request:Request){
    dbConnect();
    try {   
         const {searchParams} = new URL(request.url)
         const roomName = searchParams.get('roomName');
            
          const messages = await Message.find({roomName:roomName}).select("-_id -__v");

          if(!messages){
            return Response.json(
                { success: true},
                { status:200 }
              );
          }

        return Response.json(
            { success: true, messages },
            { status:200 }
          );

    } catch (error) {
        return Response.json(
            { success: false, message: "unable to get  messages" , error:error },
            { status: 500 }
          );
    }
}