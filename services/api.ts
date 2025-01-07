import API from "./api-instance";

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const subscribeToPlan = (data) => API.post('/subscription/subscribe', data);
export const subscriptionDetails = () => API.get('/subscription/subscription-details');
export const billingHistory = () => API.get('/subscription/billing-history');
export const updateSubscription = (data) => API.patch('/subscription/update-subscription', data);

export const fetchPlans = () => Promise.resolve([
    { id: 'price_1Qc4hYGNtASg30ng0z9Pvk2J', name: 'Basic', price: '$15/month' },
    { id: 'price_1QeYehGNtASg30nglawtEFrU', name: 'Premium', price: '$20/month' },
]);
