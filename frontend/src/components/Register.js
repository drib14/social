// components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        // Simulate registration and redirection to login
        if (email && password) {
            localStorage.setItem('authToken', 'fakeToken');
            alert('Registration Successful');
            navigate('/login');
        } else {
            alert('Please fill out all fields');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Register;
