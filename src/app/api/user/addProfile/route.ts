import { cloudinary } from "@/lib/cloudinaryConfig";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function POST(request: Request) {
    dbConnect();
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get("profileImage");

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ message: "No file uploaded" }), { status: 400 });
    }

    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    const bufferStream = Buffer.from(fileBuffer);

    // Upload to Cloudinary and handle result asynchronously
    const uploadResult:any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          reject(error);
          return Response.json(
            { success: false, message:error||"unable to upload to cloudinary"},
            {
              status: 200,
            })
        } else {
          resolve(result);
        }
      });

      uploadStream.end(bufferStream);
    });

    const cookieName = process.env.NODE_ENV === "production"? "__Secure-next-auth.session-token": "next-auth.session-token";
    const cookie=cookies().get(cookieName)?.value;

    const decodeCookie = await decode({
        token:cookie,
        secret: process.env.NEXTAUTH_SECRET || ''
    })
   
     const email = decodeCookie?.email;

     if(!email){
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
              status: 400,
            })
     }

      user.profilePicture=uploadResult.url  
      await user.save();


    // Return response with the uploaded file URL
    return Response.json(
        { success: true,  message:"successfully uploaded image" , imageUrl:uploadResult.url  },
        { status: 200 }
      );

} catch (error:any) {
    
    return Response.json(
        { success: false, message:  "Error uploading to Cloudinary" },
        { status: 500 }
      );
    
  }
}
