import React from 'react';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/api';

const Login = () => {
    const handleLogin = async (formData: any) => {
        try {
            const response: any = await loginUser(formData);
            if(response?.message) {
                alert(response.message)
                return
            }
            sessionStorage.setItem('token', response?.data?.token);
            sessionStorage.setItem('user', JSON.stringify(response?.data?.user));
            alert('Login successful!');
            if(!response?.data?.user?.stripeCustomerId){
                window.location.href = '/profile/subscriptions';
                return;
            } else {
                window.location.href = '/dashboard';
                return;
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return <AuthForm onSubmit={handleLogin} title="Login" />;
};

export default Login;
