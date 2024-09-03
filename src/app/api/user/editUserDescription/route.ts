import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function POST(request:Request){
      dbConnect();
    try {
        const {description} = await request.json();
             console.log("from req",description)
        const cookie=cookies().get('next-auth.session-token')?.value;

        const decodeCookie = await decode({
            token:cookie,
            secret: process.env.NEXTAUTH_SECRET || ''
        })
       
         const email = decodeCookie?.email;

         if(!description){
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
             console.log("user",user)
           console.log("before save",user.description)

          user.description=description;
          user.save();

          console.log("after save" ,user.description)

        return Response.json(
            { success: true, message:"description successfully added"  },
            {
              status: 200,
            })

        
    } catch (error) {
        return Response.json(
            { success: true,   },
            {
              status: 200,
            })

    }
  
}