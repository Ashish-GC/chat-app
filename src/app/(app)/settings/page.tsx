"use client";

import React, { useContext, useRef, useState } from "react";
import classes from "./settings.module.css";
import MyContacts from "@/components/shared/my-contacts/MyContacts";
import { useShowContacts } from "@/context/ContactsContext";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import FormData from "form-data"

function page() {
  const { showContacts } = useContext(useShowContacts);
  const [showSetting, setShowSetting] = useState<string>("Settings");
  const {user,setUser}= useContext(UserContext);
  const [profileData,setProfileData]=useState<File>();
  
  const {toast} = useToast();

  const description = useRef<HTMLTextAreaElement>(null);

  

   const onSaveDescription=async()=>{
         const descriptionText=description?.current?.value;
       
         try {
              
             const response = await axios.post('/api/user/editUserDescription',{description:descriptionText});
   
              if(response){
                 
                setUser((prev) => ({
                  ...prev,
                  description: descriptionText || ""
              }));

                toast({
                  variant:"default",
                  description:"Successfull",
                });
              }
        
                
         } catch (error) {
          toast({
            variant: "destructive",
            description:"Unable to Edit description. Try Again",
          });
         }

   }
   const handleProfileImageChange=(e:React.FormEvent<HTMLInputElement>)=>{

      const target = e.target as HTMLInputElement & {
        files: FileList
      }
            setProfileData(target?.files[0])
    
   }
   const addProfileImage=async()=>{
              let formData:any = new FormData();
              formData.append('profileImage',profileData);

               try {
                const  response:any = await axios.post('/api/user/addProfile',formData,{
                  headers: {
                      'Content-Type': 'multipart/form-data', 
                  },
               });
              
               if(response){

                setUser((prev)=>{
                  return {...prev,profilePicture:response.data.imageUrl}
                }) 
                 
                toast({
                  variant: "default",
                  description:"profile Image uploaded successfully",
                });
               }
               
               } catch (error) {
                // show failed toast here
                toast({
                  variant: "default",
                  description:"Unable to upload profile image. Try Again",

                });
               }
               
   }

const showSettingHandler = (setting: string) => {
    setShowSetting(setting);
  };

  return (
    <section className={classes.container}>
      {showContacts && <MyContacts />}
      <div className={classes.settings}>
        {showSetting === "Settings" && (
          <>
            <h3>{showSetting}</h3>

            <div>
              <h4 onClick={() => showSettingHandler("Profile")}>
                Profile
              </h4>
            </div>

            <div>
              <h4 onClick={() => showSettingHandler("Privacy")}>
                Privacy
              </h4>
            </div>

            <div>
              <h4 onClick={() => showSettingHandler("Theme")}>Themes</h4>
            </div>

            <div>
              <h4 onClick={() => showSettingHandler("Chat")}>Chat</h4>
            </div>
          </>
        )}

        {showSetting === "Profile" && (
          <>
            <div className="flex gap-3 items-center">
            <IoArrowBack size={25} onClick={() => showSettingHandler("Settings")}>
            </IoArrowBack>
              <h4>{showSetting}</h4>
            </div>

            <section className="h-[100%] flex flex-col gap-5">
              <div>
              <section className="flex gap-6 justify-between ">
                <h4 className="text-sm">Add profile Image</h4>
                <Button onClick={addProfileImage} size="sm" className="text-black" variant="outline">Save</Button>
                </section>
                 <input className="text-sm" onChange={handleProfileImageChange} accept="image/png, image/jpg" name ="image" type="file" />
              </div>
              <div>
                <section className="flex gap-6 justify-between ">
                <h4 className="text-sm">Add description</h4>
                <Button onClick={onSaveDescription} size="sm" className="text-black" variant="outline">Save</Button>
                </section>
                 <textarea ref={description} className="w-[100%] h-[5rem] text-black p-[5px] text-sm rounded" name="description" placeholder="Add description here" defaultValue={user.description}></textarea>
              </div>
            
            </section>
          </>
        )}
        {showSetting === "Chat" && (
          <>
            <div className="flex gap-3 items-center">
            <IoArrowBack size={25} onClick={() => showSettingHandler("Settings")}>
            </IoArrowBack>
              <h3>{showSetting}</h3>
            </div>
            <section>
              <p>font size</p>
            </section>
          </>
        )}
        {showSetting === "Theme" && (
          <>
            <div className="flex gap-3 items-center">
            <IoArrowBack size={25} onClick={() => showSettingHandler("Settings")}>
            </IoArrowBack>
              <h3>{showSetting}</h3>

            </div>
            <section>
              <h4>1. dark/light mode</h4>
              <h4>2. custom themes</h4>
            </section>
          </>
        )}
        {showSetting === "Privacy" && (
          <>
            <div className="flex gap-3 items-center">
            <IoArrowBack size={25} onClick={() => showSettingHandler("Settings")}>
            </IoArrowBack>
              <h3>{showSetting}</h3>
            
            </div>
            <section>
              <p>1. online status</p>
              <p>2. block/unblock user</p>
            </section>
          </>
        )}
      </div>
    </section>
  );
}

export default page;
