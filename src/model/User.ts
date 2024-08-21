import mongoose,{Schema} from 'mongoose';
import bcrypt from "bcrypt";
import jwt, { Secret } from 'jsonwebtoken';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // URL or path to the profile picture
    default: 'default.jpg',
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  friends: [{
    type: String,
    default: [],
 }],
  refreshToken:{
    type:String
  }
});

userSchema.pre("save",async function(next){
   if(this.isModified("password")){
           this.password=await bcrypt.hash(this.password,10);
   }
   next();
})

 userSchema.methods.isPasswordCorrect=async function ( password:string ){
  return  await bcrypt.compare(password,this.password)
 }

userSchema.methods.generateRefreshToken = async function(){
      return  jwt.sign({
            _id:this._id
         },process.env.REFRESH_TOKEN_SECRETKEY as Secret, { expiresIn: '24h' });
}

userSchema.methods.generateAccessToken= async function(){
  return  jwt.sign({
       _id:this._id,email:this.email,username:this.username
    },process.env.ACCESS_TOKEN_SECRETKEY as Secret, { expiresIn: '1h' });
}

export const User = mongoose.models.User || mongoose.model('User', userSchema);