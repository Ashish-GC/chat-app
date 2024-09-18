
import { cookies } from "next/headers";


export async function GET(request:Request){
      try {
        const cookieName = process.env.NODE_ENV === "production"? "__Secure-next-auth.session-token": "next-auth.session-token";
             cookies().delete(cookieName)

             return Response.json(
                { success: true, message: "user logged Out successfully" },
                {
                  status: 200,
                }
              );

      } catch (error) {
        return Response.json(
            { success: false, message: "unable to log out" },
            {
              status: 500,
            }
          );
      }
}