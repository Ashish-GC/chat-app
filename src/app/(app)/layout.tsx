"use client"

import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center '>
      <section className='w-[70%] h-[80%] rounded-md'>
           {children}
      </section>
    </div>
  )
}

export default layout
