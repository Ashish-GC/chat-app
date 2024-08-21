"use client";

import Link from "next/link";
import classes from "./page.module.css";
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
    <section className={classes.main}>
       <h1>Welcome to WebChat !</h1>
       <p>Your new favorite place to chat with friends and make new ones</p>
      <div className={classes.container}>
        <Button asChild variant="secondary" className="bg-[#6bffe0] hover:bg-[#01bd94] border-white " size="sm">
          <Link href="/signIn">sign In</Link>
        </Button>
        <Button asChild variant="secondary" className="bg-[#6bffe0] hover:bg-[#01bd94]  border-white " size="sm">
          <Link href="/signUp">sign Up</Link>
        </Button>
      </div>
    </section>
  );
}
