import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center flex-col gap-2'>
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Button variant="secondary"><Link href="/dashboard">Return Home</Link></Button>
    </div>
  )
}
