import dbConnect from "@/lib/dbConnect";
import { Room } from "@/model/Room";
import { User } from "@/model/User";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function GET(request:Request){
   dbConnect();
   try {
    const session = cookies().get("next-auth.session-token")?.value;

    const decodeCookie = await decode({
      token: session,
      secret: process.env.NEXTAUTH_SECRET || "",
    });

    const userEmail = decodeCookie?.email;
    const user = await User.findOne({email:userEmail})

     if(!user){
        return Response.json(
            { success: false, message: "unable to get user" },
            { status: 400 }
          );
     }

     const username = user.username;

    const { searchParams } = new URL(request.url)
    const friend = searchParams.get('friend')

    if(!friend){
        return Response.json(
            { success: false, message: "unable to get friend" },
            { status: 400 }
          );
     }

      const privateRoom =  await Room.findOne({contacts:{$all:[friend,username]}})

       return Response.json(
        { success: true, message: "room fetched successfully" , privateRoom },
        { status: 200 }
      );

   } catch (error) {
    return Response.json(
        { success: false, message: "unabel to fetch room" },
        { status: 400 }
      );
   }
}