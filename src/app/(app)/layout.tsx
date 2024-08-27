"use client"

import SideBar from '@/components/shared/sideBar/SideBar'
import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center '>
      <section className='w-[70%] h-[90%] rounded-md flex gap-5'>
          <SideBar></SideBar>
           {children}
      </section>
    </div>
  )
}

export default layout
