import React, { useState, useEffect } from 'react';
import Plans from '../../components/Plans';
import Subscribe from '../../components/Subscribe';
import { fetchPlans, subscribeToPlan, updateSubscription } from '../../services/api';
import StripeWrapper from '@/components/StripeWrapper';

const PlansPage = ({subscriptionId, subscriptionItemId}) => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    

    useEffect(() => {
        const loadPlans = async () => {
            const response = await fetchPlans();
            setPlans(response);
        };
        loadPlans();
    }, []);

    const handleSubscribe = async (values) => {
        console.log("values", values)
        try {
            console.log(subscriptionId, subscriptionItemId)
            if(subscriptionId){
                console.log("working")
                await updateSubscription({subscriptionId, newPlanId: selectedPlan, subscriptionItemId})
            } else {
                await subscribeToPlan(values);
            }
            alert('Subscription successful!');
            window.location.href = '/dashboard'
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <button onClick={handleSubscribe}>click</button>
            {!selectedPlan ? (
                <Plans plans={plans} onSelectPlan={setSelectedPlan} />
            ) : (
                <StripeWrapper>
                    <Subscribe selectedPlan={selectedPlan} onSubscribe={handleSubscribe} />
                </StripeWrapper>
            )}
        </div>
    );
};

export default PlansPage;
