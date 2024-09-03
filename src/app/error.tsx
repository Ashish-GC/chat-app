'use client' // Error components must be Client Components
 
import {useRouter} from 'next/navigation'
import { useEffect} from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    const router = useRouter();

  useEffect(() => {
    console.error(error)
  }, [error])

  function handleRedirect(){
    router.push('/dashboard');
}

 
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
      <h2 className='text-red-500'>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
         ()=>reset()
        }
      >
        reset page
      </button>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          handleRedirect
        }
      >
       redirect page
      </button>
    </div>
  )
}