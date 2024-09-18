"use client"

import SideBar from '@/components/shared/sideBar/SideBar'
import React from 'react'

function Layout({children}:{children:React.ReactNode}) {
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center '>
      <section className='lg:w-[70%] lg:h-[90%] rounded-md flex gap-5  w-[90%] h-[90%]'>
          <SideBar></SideBar>
           {children}
      </section>
    </div>
  )
}

export default Layout
