"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { RotateCcw } from 'lucide-react';
import Image from "next/image"
import { useState } from "react"
import { useRouter } from 'next/navigation'

const LoginScreen = () => {
  const [matric, setMatric] = useState('');
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
const router = useRouter();

// const fullString = '20/03sen005';
const senPart = matric.split('/')[1]; // Check if this part is not undefined
const slicedSen = senPart ? senPart.slice(2, 5) : ''; // Check if senPart is defined before using slice
  const handleLogin = async () => {
    try {
      setLoading(true)
        const email = matric+'@alhikmah.edu.ng'
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
          setLoading(false);
          localStorage.setItem('wisdombankprovider', res?.user?.uid)
          localStorage.setItem('program', slicedSen)
          router.refresh();
          console.log(res);
        })
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your Matric No below to login to your account
              default password is <span className="font-bold">passwordhui</span>
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Matriculation Number</Label>
              <Input
                id="matric"
                type="text"
                placeholder="Matric No"
                required
                onChange={(e) => setMatric(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
               
              </div>
              <Input id="password" type="password" required 
              onChange={(e) => setPassword(e.target.value)}
              placeholder='password'
              />
            </div>
            {loading ? (
              <Button disabled>
               <RotateCcw  className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
            ) : (
              <Button type="submit" className="w-full"
              onClick={handleLogin}
              >
                Login
              </Button>
            )
          }
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
export default LoginScreen