import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";

export async function POST(request: Request) {
   await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // validation

    if (!username && !email && !password) {
      return Response.json(
        { success: false, message: "All the fields are required" },
        {
          status: 400,
        }
      );
    }

    // find if user already exists

    const existingUsername:any = await User.find({ username });

    if (existingUsername?.username) {
      return Response.json(
        { success: false, message: "Username already exists",data:existingUsername },
        {
          status: 400,
        }
      );
    }
    const existingEmail:any = await User.find({ email });

    if (existingEmail?.email) {
      console.log("here",existingEmail)
      return Response.json(
        { success: false, message: "Email already exists" },
        {
          status: 400,
        }
      );
    }

    // create user
    const user = await User.create({
      username,
      email,
      password,
    });

    if (!user) {
      return Response.json(
        { success: false, message: "Failed to create user" },
        {
          status: 400,
        }
      );
    }

    return Response.json(
        { success: true, message: "User Registered Successfully"},
        {
          status: 200,
        }
      );


  } catch (error: any) {
    return Response.json(
      { success: false, message: error + " Error registering user" },
      { status: 500 }
    );
  }

}
