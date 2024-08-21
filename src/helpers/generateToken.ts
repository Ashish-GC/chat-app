import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";

export async function generateRefreshAndAccessToken(userId:any){
    await dbConnect();
     try {
        const user = await User.findById(userId);
 
         if(!user){
            return Response.json({
                status: false,
                message:"unable to get User"
            })
         }

      const accessToken = await user.generateAccessToken();
      const refreshToken= await user.generateRefreshToken();

 
      if(!accessToken && !refreshToken){
        return Response.json({
            status: false,
            message:"unable to generate tokens"
        })
      }
      
      return Response.json({
        status:true,
        message:"tokens",
        data:{accessToken,refreshToken}
    });
       
        
     } catch (error) {
        return Response.json({
            status: false,
            message:"unable to generate tokens"
        })
     }
}