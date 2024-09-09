import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


// temporary api deletes contact from only one the current user


export async function POST(request:Request){

    await dbConnect();
    try {
        const { friend } = await request.json();
     
        const session = cookies().get("next-auth.session-token")?.value;
    
        const decodeCookie = await decode({
          token: session,
          secret: process.env.NEXTAUTH_SECRET || "",
        });
    
        const userEmail = decodeCookie?.email;
     console.log(userEmail)
        if (!userEmail && !friend) {
          return Response.json(
            { success: false, message: "unable to get user or friend" },
            { status: 400 }
          );
        }
          
        const user = await User.findOne({ email: userEmail }).select("-password");

        if(!user){
            return Response.json({success:false,message:"User not found"},{status:404})
        }


          const newContactsList = user.friends.filter((fr:string)=> fr!= friend)

           user.friends = newContactsList;
           await user.save();

        return Response.json(
            { success: true, message: "contact deleted successfully"},
            { status: 200 }
          );

        
    } catch (error:any) {

        return Response.json(
            { success: false, message: "unable to delete from contact ", error: error },
            { status: 500 }
          );

    }
   

      
}