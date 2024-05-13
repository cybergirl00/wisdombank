import React from 'react'
import { Button } from './ui/button'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
const Navbar = () => {
  const router = useRouter();
  const handleLogout = async () => {
   await signOut(auth).then((res) => {
    localStorage.clear('wisdombankprovider')
    localStorage.clear('program')
    router.refresh();
   })
  }
  return (
    <div className='shadow-sm flex justify-between p-3 sticky z-10 top-0 bg-white'>
        <div className="text-2xl font-bold p-1 ">Wisdom <span className='text-primary'>Bank</span></div>
        <div className=" w-full max-w-sm items-center space-x-2 hidden lg:flex">
      <Input type="search" placeholder="Search..." />
      <Button type="submit">
         {/* <Search size={15}/> */}
       Search</Button>
    </div>
        <div className="">
            <ul className='flex items-center gap-3'>
                <li className='bg-primary text-white p-2 rounded-full hover:border hover:bg-white hover:border-primary cursor-pointer hover:text-black hover:space-x-2 transition-all ease-in lg:hidden'>
                    <Search size={15}/>
                </li>
                <li className='flex  items-center gap-2'>
                  {/* <Button>Add Past Question</Button> */}
                    <Button variant="outline" className='text-primary'
                    onClick={handleLogout}
                    > Log Out</Button>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar