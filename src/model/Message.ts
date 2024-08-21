
import mongoose,{Schema} from 'mongoose';

const messageSchema = new Schema({
   roomName:{
    type:String,
   },
   message: {
        type:String,
      },
    user:{
      type:String,
    },
    time:{
      type:Date,
    }
    
  } );
  
  export const Message = (mongoose.models.Message) || (mongoose.model('Message', messageSchema));