import Link from 'next/link'
import React from 'react'

function Profile() {
   

    return (
        <div>
            <h4>Profile</h4>
            <Link href="/profile/billing-history">Subscription</Link>
            <Link href="/profile">Settings</Link>
            <Link href="/profile">Update profile</Link>
        </div>
    )
}

export default Profile