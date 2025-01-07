import React, { useState } from 'react';

const AuthForm = ({ onSubmit, title }) => {
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {title === 'Register' && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete='name'
                    />
                )}
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete='email'
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete='new-password'
                />
            </div>
            <button type="submit">{title}</button>
        </form>
    );
};

export default AuthForm;
