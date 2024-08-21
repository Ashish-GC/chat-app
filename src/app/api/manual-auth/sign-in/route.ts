'use server'

import { generateRefreshAndAccessToken } from "@/helpers/generateToken";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { NextRequest } from "next/server";
import {cookies} from "next/headers";


export async function POST(request:NextRequest){
    await dbConnect();
    try {
        const {username, password} = await request.json();

        //validation
        if(!username && !password){
            return Response.json(
                { success: false, message: "All the fields are required" },
                {
                  status: 400,
                }
              );
        }
        // get user by username or email

        const user =  await User.findOne({$or:[
            {username:username},{email:username}
        ]})

        if(!user){
            return Response.json(
                { success: false, message: "User not found" },
                {
                  status: 400,
                }
              );
        }
        
        // check password is correct or not

         const isPasswordCorrect = await user.isPasswordCorrect(password);
         
         if(!isPasswordCorrect){
            return Response.json(
                { success: false, message: "wrong password" },
                {
                  status: 401,
                }
              );
         }

        //generate refresh and access token

          const response = await generateRefreshAndAccessToken(user._id);
           const tokens = await response.json();
           

          if(!tokens.status){
            return Response.json(
                { success: false, message: tokens?.data || 'unable to get tokens' },
                {
                  status: 400,
                }
              );
          }

        //store access token in cookies and refresh in database

            user.refreshToken = tokens.data.refreshToken;
            user.save();

        cookies().set('access-token',tokens.data.accessToken,{
            httpOnly: true,
            path:'/'
        })


        // response

        return Response.json(
            { success:true, message: "user logged in successfully" , accessToken:tokens.data.accessToken},
            {
              status: 200,
            }
          );
        
    } catch (error:any) {
        return Response.json(
            { success: false, message: error.message},
            {
              status: 401,
            }
          );
    }
} 

