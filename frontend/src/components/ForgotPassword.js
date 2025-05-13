// components/ForgotPassword.js
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle forgot password logic here
        alert(`Password reset link sent to ${email}`);
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
