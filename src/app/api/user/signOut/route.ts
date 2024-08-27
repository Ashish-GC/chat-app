
import { cookies } from "next/headers";


export async function GET(request:Request){
      try {
             cookies().delete('next-auth.session-token')

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