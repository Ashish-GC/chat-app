import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";

export async function GET(request:Request){
    dbConnect();
    try { 
         const {searchParams} = new URL(request.url);
         const friend = searchParams.get('friend');

         const  friendContactInfo = await User.findOne({username:friend}).select('-password -__v -friends');
   
          if(!friendContactInfo){
            return Response.json(
                { success: false, message: "unabel to get contact information" },
                { status: 400 }
              );
          }

          return Response.json(
            { success: true, message: "got friends contact information" , friendContactInfo },
            { status: 200 }
          );
          
    } catch (error) {
        return Response.json(
            { success: false, message: "unabel to get contact information" },
            { status: 400 }
          );
    }
}