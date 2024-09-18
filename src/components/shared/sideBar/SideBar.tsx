"use client";
import React, { useContext} from "react";
import classes from "./SideBar.module.css";
import { VscSignOut } from "react-icons/vsc";
import { SlSettings } from "react-icons/sl";
import { SlHome } from "react-icons/sl";
import profileImage from "../../../../public/profileImage.png";
import Image from "next/image";
import Link from "next/link";
import { initialUser, UserContext } from "@/context/UserContext";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { MdOutlineContacts } from "react-icons/md";
import { useShowContacts } from "@/context/ContactsContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function SideBar() {
  const { user, setUser } = useContext(UserContext);
  const { toast } = useToast();
  const { setShowContacts } = useContext(useShowContacts);

  const logOutUser = async () => {
    setUser(initialUser);
    try {
      const response = await axios.get("api/user/signOut");
      if (response) {
        toast({
          variant: "default",
          description: "Signed out successfully",
          action: (
            <ToastAction
              altText="Sign In"
              onClick={() => window.location.reload()}
            >
              Sign In Again
            </ToastAction>
          ),
        });

        setTimeout(()=>{ window.location.reload()},2000)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Unable to sign out",
      });
    }
  };

  return (
    <>
      <main className={classes.container}>
        <header className={classes.userProfile}>
          <Dialog>
            <DialogTrigger asChild>
              <Image
                className={`rounded-full ${classes.img}`}
                width={500}
                height={500}
                src={user?.profilePicture || profileImage}
                alt="remoteImage"
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] text-black">
              <DialogHeader>
                <DialogTitle>Profile</DialogTitle>
              </DialogHeader>
              <DialogDescription></DialogDescription>
              <div className=" gap-4 py-4 flex flex-col">
                <Image
                  className="rounded-full w-[5rem] h-[5rem] m-auto"
                  width={500}
                  height={500}
                  src={user?.profilePicture || profileImage}
                  alt="profileImage"
                ></Image>
                <ul>
                  <li>username : {user?.username}</li>
                  <li>email : {user?.email}</li>
                  <li>description : {user?.description}</li>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </header>
        <nav className={classes.options}>
          <ul>
            <Link href="/dashboard">
              <li>
                <SlHome size={25} />
              </li>
            </Link>
            <li onClick={() => setShowContacts((prev) => !prev)}>
              <MdOutlineContacts size={25} />
            </li>
            <Link href="/settings">
              <li>
                <SlSettings size={25} />
              </li>
            </Link>
          </ul>
        </nav>
        <footer className={classes.logOut} onClick={logOutUser}>
          <VscSignOut size={30} />
        </footer>
      </main>
    </>
  );
}

export default SideBar;
