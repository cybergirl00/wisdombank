'use client'
import HomeScreen from '@/components/screens/HomeScreen';
import LoginScreen from '@/components/screens/LoginScreen';
import React from 'react'

const page = () => {
  const user = localStorage.getItem('wisdombankprovider')
  if(user === null) return <LoginScreen />

  
  return (
    <div>
     <HomeScreen />
    </div>
  )
}

export default page