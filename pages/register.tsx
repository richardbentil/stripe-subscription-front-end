import React from 'react';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/api';

const Register = () => {
    const handleRegister = async (formData: unknown) => {
        try {
            const response: any = await registerUser(formData);
            if(response?.message) {
                alert(response.message)
                return
            }
            sessionStorage.setItem('token', response?.data?.token);
            sessionStorage.setItem('user', JSON.stringify(response?.data?.user));
            alert('Registration successful!');
            window.location.href = '/profile/subscriptions';
        } catch (error: any) {
            console.error(error);
        }
    };

    return <AuthForm onSubmit={handleRegister} title="Register" />;
};

export default Register;
