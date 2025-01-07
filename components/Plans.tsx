import React from 'react';

const Plans = ({ plans, onSelectPlan }) => {
    return (
        <div>
            <h2>Choose a Plan</h2>
            {plans.map((plan) => (
                <div key={plan.id}>
                    <h3>{plan.name}</h3>
                    <p>{plan.price}</p>
                    <button onClick={() => onSelectPlan(plan.id)}>Select</button>
                </div>
            ))}
        </div>
    );
};

export default Plans;
