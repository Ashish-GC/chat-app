import React, { useContext } from "react";
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
import { ShowContacts } from "@/context/ContactsContext";

function SideBar() {
  const { setUser } = useContext(UserContext);
  const { toast } = useToast();
  const { setShowContacts } = useContext(ShowContacts);

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
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Unable to sign out",
      });
    }
  };
  return (
    <main className={classes.container}>
      <header className={classes.userProfile}>
        <Image className={classes.img} src={profileImage} alt="remoteImage" />
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
  );
}

export default SideBar;
