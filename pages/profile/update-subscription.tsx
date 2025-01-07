import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PlansPage from './subscriptions'

function UpdateSubscription() {
   const [subscription, setSubscription] = useState<any>()

   useEffect(() => {
     const session = sessionStorage.getItem("subscription")
     const data = session && JSON.parse(session)
     console.log("data: ", data)
     if (data) {
       setSubscription(data)
     }
   }, [])
   

    return (
        <div>
        <h1>Update subscription</h1> 
           <PlansPage subscriptionId={subscription?.stripeSubscriptionId} subscriptionItemId={subscription?.subscriptionItemId} />
            
           <Link href="/profile/update-subscription">Cancel plan</Link>
        </div>
    )
}

export default UpdateSubscription