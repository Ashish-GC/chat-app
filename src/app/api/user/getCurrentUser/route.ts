import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { decode, getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  dbConnect();

  try {
    const cookieName = process.env.NODE_ENV === "production"? "__Secure-next-auth.session-token": "next-auth.session-token";
        const cookie=cookies().get(cookieName)?.value;

        const decodeCookie = await decode({
            token:cookie,
            secret: process.env.NEXTAUTH_SECRET || ''
        })
       
         const email = decodeCookie?.email;

         if(!email){
            return Response.json(
                { success: false, message:"Unathorize request" },
                {
                  status: 200,
                })
         }

         const  user = await User.findOne({
            email
         }).select("-password -v")

         if(!user){
            return Response.json(
                { success: false, message:"user dosen't exist" },
                {
                  status: 200,
                })
         }
         

          user.lastLogin = new Date();
          user.save();

        return Response.json(
            { success: true, data:user },
            {
              status: 200,
            })


  } catch (error) {
    return Response.json(
      { success: false, message: "unable to get user" },
      {
        status: 500,
      }
    );
  }
}
