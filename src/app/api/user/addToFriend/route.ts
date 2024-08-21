import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { User } from "@/model/User";
import { Room } from "@/model/Room";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { friend } = await request.json();

    const session = cookies().get("next-auth.session-token")?.value;

    const decodeCookie = await decode({
      token: session,
      secret: process.env.NEXTAUTH_SECRET || "",
    });

    const userEmail = decodeCookie?.email;

    if (!userEmail && !friend) {
      return Response.json(
        { success: false, message: "unable to add friend" },
        { status: 400 }
      );
    }
     
    const user1 = await User.findOne({ email: userEmail }).select("-password");
    const user2 = await User.findOne({ username: friend }).select("-password");



    if (!user1 && !user2) {
      return Response.json(
        { success: false, message: "user not found" },
        { status: 400 }
      );
    }

    if (user1.friends.includes(user2.username)) {
      return Response.json(
        { success: false, message: "already friends" },
        { status: 400 }
      );
    }
    user1.friends.unshift(user2.username);
    await user1.save();

    if (user2.friends.includes(user1.username)) {
      return Response.json(
        { success: false, message: "already friends" },
        { status: 400 }
      );
    }
    user2.friends.unshift(user1.username);
    await user2.save();



     // creat a room  for private messaging 

      const x = user1.username
      const y = user2.username

   
      const randomString=generateRandomString();
      const roomName = x+y+randomString;

    
   // here create room

   const createRoom = await Room.create({
    name: roomName,
    contacts: [x,y]
   })

 console.log(createRoom)
   if(!createRoom){
    return Response.json(
      { success: false, message: "unabel to create room" },
      { status: 400 }
    );
   }



    return Response.json(
      { success: true, message: "friend added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "unable to add friend" , error:error },
      { status: 500 }
    );
  }
}


function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 15; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}