import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <div>
      <Link href={'/login'}>Login</Link>
      <Link href={'/register'}>Register</Link>
      <h1>Home</h1>
    </div>

  )
}

export default Home