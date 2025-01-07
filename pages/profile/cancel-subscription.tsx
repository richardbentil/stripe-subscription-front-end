import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PlansPage from './subscriptions'

function UpdateSubscription() {
   const [subscriptionId, setSubscriptionId] = useState()

   useEffect(() => {
     const session = sessionStorage.getItem("subscription")
     const data = session && JSON.parse(session)
     if (data) {
       setSubscriptionId(data.subscriptionItemId)
     }
   }, [])
   

    return (
        <div>
        <h1>Cancel subscription</h1> 
           <PlansPage subscriptionId={subscriptionId} />
            
           <Link href="/profile/update-subscription">Cancel plan</Link>
        </div>
    )
}

export default UpdateSubscription