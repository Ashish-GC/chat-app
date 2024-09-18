import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { User } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { friend } = await request.json();

    const cookieName = process.env.NODE_ENV === "production"? "__Secure-next-auth.session-token": "next-auth.session-token";
    const session = cookies().get(cookieName)?.value;

    const decodeCookie = await decode({
      token: session,
      secret: process.env.NEXTAUTH_SECRET || "",
    });

    const userEmail = decodeCookie?.email;

    if (!userEmail && !friend) {
      return Response.json(
        { success: false, message: "unable to remove friend" },
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

    const user1_friends = user1.friends.filter((friend:any)=>friend != user2.username)
    const user2_friends = user2.friends.filter((friend:any)=>friend != user1.username)  
    
    user1.friends=user1_friends;
    user2.friends=user2_friends;

     await user1.save();
     await user2.save();

    return Response.json(
      { success: true, message: "friend removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "unable to remove friend" , error:error },
      { status: 500 }
    );
  }
}
