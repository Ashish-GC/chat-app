"use client"

import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='w-[100%] h-[100%] flex justify-center items-center backdrop-blur-sm'>
       {children}
    </div>
  )
}

export default layout