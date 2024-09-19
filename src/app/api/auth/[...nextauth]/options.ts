
 //providers
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

// import CredentialsProvider from 'next-auth/providers/credentials'
// import bcrypt from 'bcrypt'
// import { User } from "@/model/User";
// import dbConnect from "@/lib/dbConnect";

export const authOptions:NextAuthOptions = {
 
  providers: [
     // google provider
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
      },
    ),

 // credentials provider
    //   CredentialsProvider({
    //     name: 'Credentials',
    //     credentials: {
    //       username:{label:'Username', type:'name'},
    //       password: { label: 'Password', type: 'password' },
    //     },
    //     async authorize(credentials:any):Promise<any> {
    //          await dbConnect();
    //         try {
    //             const {username, password} = credentials;
        
    //             //validation
    //             if(!username && !password){
    //                 return Response.json(
    //                     { success: false, message: "All the fields are required" },
    //                     {
    //                       status: 400,
    //                     }
    //                   );
    //             }
    //             // get user by username or email
        
    //             const user =  await User.findOne(
    //                 {username:username}
    //             )
        
    //             if(!user){
    //                 return Response.json(
    //                     { success: false, message: "User not found" },
    //                     {
    //                       status: 400,
    //                     }
    //                   );
    //             }
                
    //             // check password is correct or not
        
    //              const isPasswordCorrect = await user.isPasswordCorrect(password);
                 
    //              if(!isPasswordCorrect){
    //                 return Response.json(
    //                     { success: false, message: "wrong password" },
    //                     {
    //                       status: 401,
    //                     }
    //                   );
    //              }
        
           
    //             // response
        
    //             return user;
                
    //         } catch (error:any) {
    //             return Response.json(
    //                 { success: false, message: error.message},
    //                 {
    //                   status: 401,
    //                 }
    //               );
    //         }
    //     },
    //   }),

    ],
    
  callbacks: {
    // signIn, session callbacks
    async signIn({user}):Promise<any>{
        await dbConnect();
        try {
            const {email,image} = user;

            //validation
            if(!email){
                throw new Error("email not available")
            }
            // get user by username or email
    
            const currentUser =  await User.findOne({email}).select('-password');
     
            if(!currentUser){
                throw new Error("unable to create User")
            }
          
            //  currentUser.profilePicture = image;
            //  currentUser.save();

            // response
    
            return currentUser;
            
        } catch (error:any) {
           throw new Error("user not registered")
        }
    },
    async jwt({ token, user}) {
        
        if(user){   
            token.email = user.email
        }
       return token
     },
     async session({ session, token }:{session:any,token:any}) {
        if(token){
              session.user.email=token.email;
        }

     return session
   }

  },

  session:{
    strategy:'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  secret:process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/signIn', // Custom sign-in page
  },
  events:{
    async signOut({token}){
        const cookieName = process.env.NODE_ENV === "production"? "__Secure-next-auth.session-token": "next-auth.session-token";
             cookies().delete(cookieName)
    }
  }
}
export default NextAuth(authOptions)