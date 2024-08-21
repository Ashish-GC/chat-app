import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import mongoose from "mongoose";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function GET(request:Request){
     dbConnect();
     try {
        const cookie = cookies().get('next-auth.session-token')?.value;
        const decodeCookie= await decode({
             token:cookie,
             secret: process.env.NEXTAUTH_SECRET || ''
        })

         const email = decodeCookie?.email ;

         if(!email){
            return Response.json({success:false , message: "unable to get user from session"},{status:400})
         }

       
         const userContacts = await  User.aggregate(
            [
                {
                  $match: {
                     email:email
                  }
                },
                {
                  $limit: 1
                },
                {
                  $unwind: "$friends"
                },
                {
                  $lookup: {
                    from: "users",
                    localField:"friends",
                    foreignField:"username",
                    as: "result"
                  }
                },
                {$unwind: "$result"} ,
              
                {
                  $group: {
                    _id:"",
                    friendDetails:{
                      $push:"$result"
                    }
                  }
                },
                {
                  $project: {
                     friendDetails:{
                       username:1,
                       email:1,
                       profilePicture:1,
                       lastLogin:1,
                       _id:1
                     }
                  }
                }
                
              ]
         )
          
         return Response.json({success:true, message: "user contacts fetched", contacts:userContacts},{status:200})

     } catch (error) {
         return Response.json({success:false , message: "unable to get user contacts"},{status:500})
     }
}