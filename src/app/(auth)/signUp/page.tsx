"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"

import classes from '../authstyle.module.css'


const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  email: z.string().email({message:"this is not a valid email"})
})


function page() {

    const router = useRouter();

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password:"",
      email:""
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
     
    const response = await axios.post('/api/manual-auth/sign-up',values);
   if(response){
         router.replace("/signIn");
   }
   

  }

  return (
    <div className={classes.container}>
   <h3>Sign Up</h3>
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="enter a username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button variant="secondary" className="bg-[#6bffe0] hover:bg-[#01bd94] border-white " size="sm" type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default page
