"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

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


import { signIn } from "next-auth/react";

const formSchema = z.object({
  username: z.string().max(50),
  password: z.string().max(50)
})


function Page() {

    const router = useRouter();

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password:""
    },
  })

 // Manual authentication
  // async function onSubmit(values: z.infer<typeof formSchema>) {
    
  //   const response = await axios.post('/api/manual-auth/sign-in',values)
  //      console.log(response)
  //       if(response.status){
  //         router.replace('/dashboard')
  //       }
  // }

 // Next Auth Google Authentication
 async function signInWithGoogle(){
  
  await signIn('google',{
    redirect:false
   })

 }

  return (
    <div className={classes.container}>
   <h3>Sign In</h3>
   <Button variant="secondary" onClick={signInWithGoogle} className="bg-[#6bffe0] hover:bg-[#01bd94] border-white " size="sm" >SignIn with Google</Button>
   {/* <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username/Email</FormLabel>
              <FormControl>
                <Input placeholder="username / email" {...field} />
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
    </Form> */}
    </div>
  )
}

export default Page
