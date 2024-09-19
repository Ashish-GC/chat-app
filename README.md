chat App

deployed  : https://chat-app-nu-green.vercel.app/

1) Authentication and Authorization :
    a) using NextAuth (google provider)
    b) manual using refresh and accessToken


2) Improvement tasks ->
    
-> minor improvements
show active users  
show latest messages in contacts 
alert for unread messages 
notification when the other user is typing

-> major Improvements =>
redis - store currentUser , current user contacts , messages based on user
complete settings page 
adding message autofill / recommendation -AI 


-> difficult / failed tasks =>
ensuring that logging in on a new device invalidates the previous session 
responsive design 
use encryption logic to encrypt the message
send file data in message
delete a contact - only deleted from current user side 
video call ->challenges faced 
 logic for sending the offer/answer to the other user - cannot use websocket in the app as while calling i cant get the socket id of the other client

--> Hoisting
 vercel - cannot be done as it cannot host a custom server 
   soln : can be hosted by separating the custom server logic (it handles socket io)

  render: hosted on render

  


   
