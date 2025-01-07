import Link from 'next/link'
import React from 'react'

function Dashboard() {
  return (
    <div>
        {/* Add your navigation links here */}
        <Link href='/profile'>Profile</Link>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p>
        {/* Add your dashboard components here */}
  
    </div>
  )
}

export default Dashboard