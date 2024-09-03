"use client";

import React, { useContext, useRef, useState } from "react";
import classes from "./settings.module.css";
import MyContacts from "@/components/shared/my-contacts/MyContacts";
import { ShowContacts } from "@/context/ContactsContext";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

function page() {
  const { showContacts } = useContext(ShowContacts);
  const [showSetting, setShowSetting] = useState<string>("Settings");
  const {user,setUser}= useContext(UserContext);


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
              <h3>{showSetting}</h3>
            </div>

            <section className="h-[100%] flex flex-col gap-5">
              <div>
              <section className="flex gap-6 justify-between ">
                <h4 className="text-lg">Add profile Image</h4>
                <Button size="sm" className="text-black" variant="outline">Save</Button>
                </section>
                 <input type="file" placeholder="add profile Image" />
              </div>
              <div>
                <section className="flex gap-6 justify-between ">
                <h4 className="text-lg">Add description</h4>
                <Button onClick={onSaveDescription} size="sm" className="text-black" variant="outline">Save</Button>
                </section>
                 <textarea ref={description} className="w-[100%] h-[5rem] text-black p-[5px]" name="description" placeholder="Add description here" defaultValue={user.description}></textarea>
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
