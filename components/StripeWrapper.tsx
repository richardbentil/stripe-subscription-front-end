import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as string);

const StripeWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    );
}

export default StripeWrapper;