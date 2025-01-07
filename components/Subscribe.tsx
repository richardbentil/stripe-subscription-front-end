import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Subscribe = ({ selectedPlan, onSubscribe }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        const paymentMethod = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        console.log(paymentMethod)

        if (paymentMethod.error) {
            console.error(paymentMethod.error.message);
        } else {
            const session = sessionStorage.getItem('user')
            const user = session && JSON.parse(session)
            onSubscribe({ userId: user?._id, paymentMethodId: paymentMethod.paymentMethod.id, planId: selectedPlan });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Subscribe
            </button>
        </form>
    );
};

export default Subscribe;
