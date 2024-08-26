
import {
  Dialog,
  DialogContent,
  
  DialogDescription,
  
  DialogFooter,
  
  DialogHeader,
  
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import EmojiPicker from "emoji-picker-react";

export function OpenEmoji({getEmoji}:{getEmoji:any}) {
  const emojiClickHandler=(emojiObject:any)=>{
      getEmoji(emojiObject.emoji)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-lg cursor-pointer">😊</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-max bg-white " style={{color:"black"}}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
           
          </DialogDescription>
        </DialogHeader>
      
           <div>
             <EmojiPicker onEmojiClick={emojiClickHandler}/>
           </div>

        <DialogFooter className="sm:justify-start">
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
