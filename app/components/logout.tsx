'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logout = () => {
const router = useRouter()
  
const handleLogout = async () => {

  try {
    await fetch('/api/logout', {
      method: 'GET',
    })

    router.refresh()
  } catch (error) {
    console.error(error)
  }
}

  return (
    <div>
      <strong><button onClick={handleLogout}>Logout</button></strong>
    </div>
  )
}

export default Logout
