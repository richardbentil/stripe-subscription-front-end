import { billingHistory, subscriptionDetails } from '@/services/api'
import React, { useEffect, useState } from 'react'
import CancelSubscription from './cancel-subscription'
import Link from 'next/link';

function BillingHistory() {
    const [subscription, setSubscription] = useState<any>(null);
    const [billing, setBilling] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSubscriptionDetails() {
            try {
                const results = await Promise.allSettled([
                    subscriptionDetails(),
                    billingHistory(),
                ]);

                const [subscriptionResult, billingResult] = results;

                if (subscriptionResult.status === 'fulfilled') {
                    console.log(subscriptionResult.value.data)
                    setSubscription(subscriptionResult.value.data);
                    sessionStorage.setItem('subscription', JSON.stringify(subscriptionResult.value.data))
                } else {
                    console.error('Failed to fetch subscription details:', subscriptionResult.reason);
                }

                if (billingResult.status === 'fulfilled') {
                    setBilling(billingResult.value.data);
                } else {
                    console.error('Failed to fetch billing history:', billingResult.reason);
                }
            } catch (error) {
                console.error('Error fetching subscription details:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSubscriptionDetails();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {subscription ? (
                <div>
                    <h2>Subscription Details</h2>
                    <p>Plan: {subscription?.plan}</p>
                    <p>Price: {subscription?.price} {subscription?.currency.toUpperCase()}</p>
                    <p>Next Billing Date: {new Date(subscription?.nextBillingDate).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Failed to load subscription details.</p>
            )}

            {billing ? (
                <div>
                    <h2>Billing History:</h2>
                    {billing?.map((item: any, index: number) => (
                        <div key={index}>
                            <p>{item.date}: {item.amount}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Failed to load billing history.</p>
            )}
            <Link href="/profile/update-subscription">Upgrade plan</Link>
        </div>
    );
}

export default BillingHistory;
